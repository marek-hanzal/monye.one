import {injectable} from "tsyringe";
import {
    utils,
    type WorkBook
}                   from "xlsx";
import type {
    ITab,
    ITabService,
    IXlsxTab
}                   from "../api";

@injectable()
export class TabService implements ITabService {
    async toTabs(workbook: WorkBook): Promise<ITab[]> {
        const tabs = workbook.Sheets["tabs"];
        if (!tabs) {
            return [];
        }
        return utils.sheet_to_json<IXlsxTab>(tabs).map<ITab>(({tab, services}) => ({tab, services: services.split(/,\s+/g)}));
    }
}
