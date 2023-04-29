import {type WorkBook} from "xlsx";
import {type IMeta}    from "../schema";

/**
 * Service used to extract metadata from the Excel file used for the import itself.
 */
export interface IMetaService {
    toMeta(props: IMetaService.MetaProps): Promise<IMeta>;
}

export namespace IMetaService {
    export interface MetaProps {
        workbook: WorkBook;
        file: string;
        name: string;
    }
}

export const $MetaService = Symbol.for(
    "@leight/xlsx-import-server/IMetaService"
);
