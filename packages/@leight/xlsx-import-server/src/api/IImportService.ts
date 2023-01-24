import {type IImportJob, type IWithImporters} from "@leight/import";
import {type IJobProgress} from "@leight/job";
import {type WorkBook} from "xlsx";

/**
 * Main service used for importing Excel files (the final handler, should be used inside
 * a job).
 */
export interface IImportService {
    import(
        props: IImportService.ImportProps
    ): Promise<IImportService.ImportResult>;
}

export namespace IImportService {
    export interface ImportProps extends IWithImporters {
        workbook: WorkBook;
        job: IImportJob;
        jobProgress: IJobProgress;
    }

    export interface ImportResult {
        total: number;
        success: number;
        failure: number;
        skip: number;
        runtime: number;
    }
}

export const $ImportService = Symbol.for(
    "@leight/xlsx-import-server/ImportService"
);
