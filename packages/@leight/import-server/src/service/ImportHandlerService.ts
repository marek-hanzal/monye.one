import {
    $Container,
    type IContainer
} from "@leight/container";
import {
    type IImportHandler,
    type IImportHandlerService
} from "@leight/import";

export class ImportHandlerService implements IImportHandlerService {
    static inject = [
        $Container,
    ];

    constructor(
        protected container: IContainer,
    ) {
    }

    resolve<TItem, TParams>(service: string): IImportHandler<TItem, TParams> {
        if (!service.toLowerCase().includes("import")) {
            throw new Error(`Cannot use requested service [${service}]. Probably not an import service.`);
        }
        return this.container.resolve(Symbol.for(service));
    }
}
