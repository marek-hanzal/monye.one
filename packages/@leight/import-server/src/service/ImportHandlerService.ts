import "reflect-metadata";
import {inject, injectable} from "tsyringe";
import {$Container, type IContainer} from "@leight/container";
import {type IImportHandler, type IImportHandlerService} from "@leight/import";

@injectable()
export class ImportHandlerService implements IImportHandlerService {
    constructor(
        @inject($Container) protected container: IContainer
    ) {
    }

    resolve<TItem>(service: string): IImportHandler<TItem> {
        if (!service.toLowerCase().includes('import')) {
            throw new Error(`Cannot use requested service [${service}]. Probably not an import service.`);
        }
        /**
         * @TODO add validation for service to prevent resolving arbitrary services by the user.
         */
        return this.container.resolve(Symbol.for(service));
    }
}
