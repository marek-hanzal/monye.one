import type {
    ITab,
    ITabService,
    IXlsxTab
} from "@leight/xlsx-import";
import {
    utils,
    type WorkBook
} from "xlsx";

export class TabService implements ITabService {
    async toTabs(workbook: WorkBook): Promise<ITab[]> {
        const {tabs} = workbook.Sheets;
        if (!tabs) {
            return [];
        }
        return utils
            .sheet_to_json<IXlsxTab>(tabs)
            .map<ITab>(({
                            tab,
                            services
                        }) => ({
                tab,
                services: services.split(/,\s+/g),
            }));
    }
}
