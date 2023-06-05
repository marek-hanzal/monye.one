import {type IContainer}       from "@leight/container";
import {$ImportHandlerService} from "@leight/import";
import {ImportHandlerService}  from "./service";

export const withImportContainer = (container: IContainer) => {
    container.bindClass($ImportHandlerService, ImportHandlerService);
};
