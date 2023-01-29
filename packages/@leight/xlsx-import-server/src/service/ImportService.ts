import "reflect-metadata";
import {streamOf} from "@leight/utils-server";
import {measureTime} from "measure-time";
import {type IJob} from "@leight/job";
import {type Readable} from "node:stream";
import {inject, injectable} from "tsyringe";
import {stream} from "xlsx";
import {$MetaService, type IImportService, type IMetaService} from "@leight/xlsx-import";

@injectable()
export class ImportService implements IImportService {
    constructor(@inject($MetaService) protected metaService: IMetaService) {
    }

    async async({fileId}: IImportService.IAsyncProps): Promise<IJob> {
        setTimeout(() => {
            console.log("Sooo, it is time for import!", fileId);
        }, 0);
        return {id: "job-id", created: new Date()} as unknown as IJob;
    }

    async import({
                     workbook,
                     importers,
                     jobProgress,
                 }: IImportService.ImportProps): Promise<IImportService.ImportResult> {
        const {tabs, translations} = await this.metaService.toMeta(workbook);

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
                const handler = importers[service]?.();
                if (!handler) {
                    await streamOf($stream, async () => {
                        skip++;
                        await jobProgress.onSkip();
                    });
                    continue;
                }
                await handler.begin?.({});
                const getElapsed = measureTime();
                await streamOf<Record<string, unknown>>(
                    $stream,
                    async (item) => {
                        try {
                            await handler.handler(
                                /**
                                 * @TODO use Translation service to resolve item translation
                                 */
                                item
                                // Object.keys(item).reduce<object>(
                                //     (obj, key) => ({
                                //         ...obj,
                                //         [translations[key] || key]: item[key],
                                //     }),
                                //     {}
                                // )
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
