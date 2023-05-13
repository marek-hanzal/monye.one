import {type IContainer}     from "@leight/container";
import {ServiceContext}      from "@leight/container-server";
import {type IImportService} from "@leight/import";
import {$XlsxImportService}  from "@leight/xlsx-import";

/**
 * Wrapper for accessing typed ImportService from any container.
 */
export const ImportServiceContext = (container: IContainer) => new ServiceContext<IImportService>(container, $XlsxImportService);
