import {type WorkBook} from "xlsx";
import {ITab}          from "./ITab";

/**
 * Service used to extract tab metadata from the Excel spreadsheet.
 */
export interface ITabService {
    toTabs(workbook: WorkBook): Promise<ITab[]>;
}

export const $TabService = Symbol.for("@leight/xlsx-import/TabService");
