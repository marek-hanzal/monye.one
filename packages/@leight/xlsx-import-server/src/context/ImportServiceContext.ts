import {container as coolContainer} from "tsyringe";
import {$ImportService, type IImportService} from "@leight/xlsx-import";

export class $ImportServiceContext {
    constructor(private container: typeof coolContainer) {
    }

    resolve(): IImportService {
        return this.container.resolve<IImportService>($ImportService);
    }
}

/**
 * Wrapper for accessing typed ImportService from any container.
 */
export const ImportServiceContext = (container: typeof coolContainer) => {
    return new $ImportServiceContext(container);
};
