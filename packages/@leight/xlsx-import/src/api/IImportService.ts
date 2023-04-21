import {
    type IImportJobSchemaType,
    type IImportResult
}                    from "@leight/import";
import {IJobService} from "@leight/job";

/**
 * Main service used for importing Excel files (the final handler, should be used inside
 * a job).
 */
export interface IImportService extends IJobService<IImportJobSchemaType, IImportResult> {
}


export const $ImportService = Symbol.for(
    "@leight/xlsx-import/IImportService"
);
