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
        return this.container.resolve(Symbol.for(service));
    }
}
