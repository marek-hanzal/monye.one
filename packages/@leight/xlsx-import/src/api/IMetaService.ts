import {type WorkBook} from "xlsx";
import {type IMetaSchema} from "../schema";

/**
 * Service used to extract metadata from the Excel file used for the import itself.
 */
export interface IMetaService {
    toMeta(workbook: WorkBook): Promise<IMetaSchema>;
}

export const $MetaService = Symbol.for(
    "@leight/xlsx-import-server/MetaService"
);
