import {type WorkBook} from "xlsx";
import {IMeta}         from "./IMeta";

/**
 * Service used to extract metadata from the Excel file used for the import itself.
 */
export interface IMetaService {
    toMeta(workbook: WorkBook): Promise<IMeta>;
}

export const $MetaService = Symbol.for("@leight/xlsx-import/MetaService");
