import "reflect-metadata";
import {injectable} from "tsyringe";
import {utils, type WorkBook} from "xlsx";
import type {ITabSchema, ITabService, IXlsxTab} from "@leight/xlsx-import";

@injectable()
export class TabService implements ITabService {
    async toTabs(workbook: WorkBook): Promise<ITabSchema[]> {
        const {tabs} = workbook.Sheets;
        if (!tabs) {
            return [];
        }
        return utils
            .sheet_to_json<IXlsxTab>(tabs)
            .map<ITabSchema>(({tab, services}) => ({
                tab,
                services: services.split(/,\s+/g),
            }));
    }
}
