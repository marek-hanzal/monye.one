import {type WorkBook}   from "xlsx";
import {type ITabSchema} from "../schema";

/**
 * Service used to extract tab metadata from the Excel spreadsheet.
 */
export interface ITabService {
    toTabs(workbook: WorkBook): Promise<ITabSchema[]>;
}

export const $TabService = Symbol.for("@leight/xlsx-import-server/TabService");
