import {
    type IContainer,
    ServiceContext
}                            from "@leight/container";
import {type IImportService} from "@leight/import";

export const $XlsxImportService = Symbol.for("@leight/xlsx-import/IImportService");
/**
 * Wrapper for accessing typed ImportService from any container.
 */
export const withImportService = (container: IContainer) => new ServiceContext<IImportService>(container, $XlsxImportService).resolve();
