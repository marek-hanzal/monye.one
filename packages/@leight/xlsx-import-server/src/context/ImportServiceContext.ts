import {$ImportService, type IImportService} from "@leight/xlsx-import";
import {type IContainer} from "@leight/container";

export class $ImportServiceContext {
    constructor(private container: IContainer) {
    }

    resolve(): IImportService {
        return this.container.resolve<IImportService>($ImportService);
    }
}

/**
 * Wrapper for accessing typed ImportService from any container.
 */
export const ImportServiceContext = (container: IContainer) => {
    return new $ImportServiceContext(container);
};
