import {
    type IContainer,
    ServiceContext
} from "@leight/container";
import {
    $ImportService,
    type IImportService
} from "@leight/xlsx-import";

/**
 * Wrapper for accessing typed ImportService from any container.
 */
export const ImportServiceContext = (container: IContainer) => new ServiceContext<IImportService>(container, $ImportService);
