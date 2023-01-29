import {IContainer} from "@leight/container";
import {$ImportHandlerService, type IImportHandlerService} from "@leight/import";
import {ImportHandlerService} from "./service/ImportHandlerService";

export interface IImportContainer {
    ImportHandlerService: IImportHandlerService;
}

export const ImportContainer = (container: IContainer): IImportContainer => {
    container.register<IImportHandlerService>($ImportHandlerService, {
        useClass: ImportHandlerService,
    });

    return {
        get ImportHandlerService() {
            return container.resolve<IImportHandlerService>($ImportHandlerService);
        }
    }
}
