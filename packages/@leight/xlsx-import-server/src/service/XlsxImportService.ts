import {
    $FileService,
    type IFileService
}                              from "@leight/file";
import {
    $ImportHandlerService,
    type IImportHandlerService,
    type IImportParamsSchema,
    type IImportResult,
    type IImportService,
    ImportParamsSchema
} from "@leight/import";
import {AbstractImportService} from "@leight/import-server";
import {
    $JobExecutor,
    type IJobExecutor,
    type IJobService
}                              from "@leight/job";
import {cleanOf}               from "@leight/utils";
import {streamOf}              from "@leight/utils-server";
import {
    $MetaService,
    $TranslationService,
    $XlsxImportService,
    type IMetaService,
    type ITranslationService
}                              from "@leight/xlsx-import";
import {measureTime}           from "measure-time";
import {Readable}              from "node:stream";
import {
    readFile,
    stream,
    WorkSheet,
}                              from "xlsx";

export class XlsxImportService extends AbstractImportService<IImportParamsSchema> implements IImportService {
    static inject = [
        $MetaService,
        $FileService,
        $JobExecutor,
        $TranslationService,
        $ImportHandlerService,
    ];

    constructor(
        protected metaService: IMetaService,
        protected fileService: IFileService,
        protected jobExecutor: IJobExecutor,
        protected translationService: ITranslationService,
        protected importHandlerService: IImportHandlerService,
    ) {
        super(
            $XlsxImportService,
            jobExecutor,
        );
    }

    async handle(
        {
            params,
            jobProgress,
        }: IJobService.IHandleProps<IImportParamsSchema>): Promise<IImportResult> {
        const file                 = await this.fileService.fetch(params.fileId);
        const workbook             = readFile(file.location, {
            type:      "binary",
            cellDates: true,
            cellNF:    false,
        });
        const {tabs, translations} = await this.metaService.toMeta({workbook, file: file.location, name: file.name});

        let total   = 0;
        let success = 0;
        let failure = 0;
        let skip    = 0;
        let runtime = 0;

        const handleWorksheet = async (workSheet: WorkSheet, service: string) => {
            const $stream: Readable = stream.to_json(workSheet, {
                defval: null,
            });
            try {
                const handler   = this.importHandlerService.resolve(service);
                const validator = handler.validator();
                await handler.begin?.({});
                const getElapsed = measureTime();
                await streamOf<Record<string, string>>(
                    $stream,
                    async (item) => {
                        try {
                            await handler.handler({
                                item: cleanOf(
                                    validator.parse(
                                        this.translationService.translate(item, translations)
                                    )
                                ),
                                params,
                            });
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
                console.error(e);
                await streamOf($stream, async () => {
                    skip++;
                    await jobProgress.onSkip();
                });
            }
        };

        const handleWithService = async (service: string) => {
            await Promise.all(
                workbook.SheetNames.map(async (name) => {
                    const workSheet = workbook.Sheets[name];
                    if (!workSheet) {
                        return;
                    }
                    await streamOf(stream.to_json(workSheet), async () => {
                        total++;
                    });
                })
            );

            await jobProgress.setTotal(total);

            for (const tab of workbook.SheetNames) {
                const workSheet = workbook.Sheets[tab];
                if (!workSheet) {
                    continue;
                }
                await handleWorksheet(workSheet, service);
            }
        };

        const handleWithMetadata = async () => {
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
                    await handleWorksheet(workSheet, service);
                }
            }
        };

        params.service ? await handleWithService(params.service) : await handleWithMetadata();

        return {
            total,
            success,
            failure,
            skip,
            runtime,
        };
    }

    validator() {
        return ImportParamsSchema;
    }
}
