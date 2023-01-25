import "reflect-metadata";
import { streamOf } from "@leight/utils-server";
import { measureTime } from "measure-time";
import { type Readable } from "node:stream";
import { inject, injectable } from "tsyringe";
import { stream } from "xlsx";
import { $MetaService, type IImportService, type IMetaService } from "../api";

@injectable()
export class ImportService implements IImportService {
    constructor(@inject($MetaService) protected metaService: IMetaService) {}

    async import({
        workbook,
        importers,
        jobProgress,
    }: IImportService.ImportProps): Promise<IImportService.ImportResult> {
        const { tabs, translations } = await this.metaService.toMeta(workbook);

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

        for (const { services, tab } of tabs) {
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
                        jobProgress.onSkip();
                    });
                    continue;
                }
                await handler.begin?.({});
                const getElapsed = measureTime();
                await streamOf<Record<string, any>>($stream, async (item) => {
                    try {
                        await handler.handler(
                            Object.keys(item).reduce<any>((obj, key) => {
                                obj[translations[key] || key] = item[key];
                                return obj;
                            }, {})
                        );
                        success++;
                        await jobProgress.onSuccess();
                    } catch (e) {
                        failure++;
                        await jobProgress.onFailure();
                        console.error(e);
                    }
                });
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
