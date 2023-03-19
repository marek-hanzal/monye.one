import {IContainer}           from "@leight/container";
import {
    $ImportHandlerService,
    type IImportHandlerService
}                             from "@leight/import";
import {ImportHandlerService} from "./service";

export interface IImportContainer {
    ImportHandlerService: IImportHandlerService;
}

export const ImportContainer = (container: IContainer): IImportContainer => {
    container.bindClass($ImportHandlerService, ImportHandlerService);

    return {
        get ImportHandlerService() {
            return container.resolve<IImportHandlerService>($ImportHandlerService);
        }
    };
};
