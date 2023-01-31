import "reflect-metadata";
import {streamOf} from "@leight/utils-server";
import {measureTime} from "measure-time";
import {$JobExecutor, type IJobExecutor} from "@leight/job";
import {type Readable} from "node:stream";
import {inject, injectable} from "tsyringe";
import {readFile, stream} from "xlsx";
import {
    $ImportService,
    $MetaService,
    $TranslationService,
    type IImportService,
    type IMetaService,
    type ITranslationService
} from "@leight/xlsx-import";
import {$FileService, type IFileService} from "@leight/file";
import {$ImportHandlerService, type IImportHandlerService, type IImportJob} from "@leight/import";
import {cleanOf} from "@leight/utils";

@injectable()
export class ImportService implements IImportService {
    constructor(
        @inject($MetaService) protected metaService: IMetaService,
        @inject($FileService) protected fileService: IFileService,
        @inject($JobExecutor) protected jobExecutor: IJobExecutor,
        @inject($TranslationService) protected translationService: ITranslationService,
        @inject($ImportHandlerService) protected importHandlerService: IImportHandlerService,
    ) {
    }

    async async({fileId}: IImportService.IAsyncProps): Promise<IImportJob> {
        return this.jobExecutor.execute({
            name: $ImportService.toString(),
            params: {
                fileId,
            },
            handler: props => this.job(props),
        });
    }

    async job({
                  jobProgress,
                  params: {fileId}
              }: IJobExecutor.HandlerRequest<IImportJob>): Promise<IImportService.ImportResult> {
        const file = await this.fileService.fetch(fileId);
        const workbook = readFile(file.location, {
            type: 'binary',
            cellDates: true,
            cellNF: false,
        });
        const {tabs, translations} = await this.metaService.toMeta({workbook, file: file.location, name: file.name});

        let total = 0;
        let success = 0;
        let failure = 0;
        let skip = 0;
        let runtime = 0;

        await Promise.all(
            tabs.map(async (tab) => {
                const workSheet = workbook.Sheets[tab.tab];
                if (!workSheet) {
                    return;
                }
                await Promise.all(
                    tab.services.map(async () => {
                        return streamOf(stream.to_json(workSheet), async () => {
                            total++;
                        });
                    })
                );
            })
        );

        await jobProgress.setTotal(total);

        for (const {services, tab} of tabs) {
            const workSheet = workbook.Sheets[tab];
            if (!workSheet) {
                continue;
            }
            for (const service of services) {
                const $stream: Readable = stream.to_json(workSheet, {
                    defval: null,
                });
                try {
                    const handler = this.importHandlerService.resolve(service);
                    const validator = handler.validator();
                    await handler.begin?.({});
                    const getElapsed = measureTime();
                    await streamOf<Record<string, string>>(
                        $stream,
                        async (item) => {
                            try {
                                await handler.handler(
                                    cleanOf(
                                        validator.parse(
                                            this.translationService.translate(item, translations)
                                        )
                                    )
                                );
                                success++;
                                await jobProgress.onSuccess();
                            } catch (e) {
                                failure++;
                                await jobProgress.onFailure();
                                console.error(e);
                            }
                        }
                    );
                    runtime += getElapsed().millisecondsTotal;
                    await handler.end?.({});
                } catch (e) {
                    await streamOf($stream, async () => {
                        skip++;
                        await jobProgress.onSkip();
                    });
                    console.error(e);
                }
            }
        }

        return {
            total,
            success,
            failure,
            skip,
            runtime,
        };
    }
}
