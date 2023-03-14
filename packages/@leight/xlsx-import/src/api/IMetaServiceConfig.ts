import {type WorkBook} from "xlsx";

/**
 * Service used to extract metadata from the Excel file used for the import itself.
 */
export interface IMetaServiceConfig {
    templates: string;
}

export namespace IMetaServiceConfig {
    export interface MetaProps {
        workbook: WorkBook;
        file: string;
    }
}

export const $MetaServiceConfig = Symbol.for(
    "@leight/xlsx-import-server/MetaServiceConfig"
);
