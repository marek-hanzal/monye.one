/**
 * Main service used for importing Excel files (the final handler, should be used inside
 * a job).
 */
export interface IImportService {
}

export const $ImportService = Symbol.for("@leight/xlsx-import/ImportService");
