import {type IJobService}         from "@leight/job";
import {type IImportParamsSchema} from "../schema";
import {type IImportResult}       from "./IImportResult";

/**
 * Service used for importing files.
 */
export interface IImportService<TParamsSchema extends IImportParamsSchema = IImportParamsSchema> extends IJobService<TParamsSchema, IImportResult> {
}
