import {type IImportJob}    from "@leight/import";
import {type IJobExecutor,} from "@leight/job";

/**
 * Main service used for importing Excel files (the final handler, should be used inside
 * a job).
 */
export interface IImportService {
    async(props: IImportService.IAsyncProps): Promise<IImportJob>;

    job(props: IJobExecutor.HandlerRequest<IImportJob>): Promise<IImportService.ImportResult>;
}

export namespace IImportService {
    export interface ImportResult {
        total: number;
        success: number;
        failure: number;
        skip: number;
        runtime: number;
    }

    export interface IAsyncProps {
        service?: string;
        fileId: string;
    }
}

export const $ImportService = Symbol.for(
    "@leight/xlsx-import-server/ImportService"
);
