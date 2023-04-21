import {type IContainer}          from "@leight/container";
import {
    $TransactionImportHandler,
    $TransactionSource,
    $TransactionSourceMapper,
    $TransactionSourceService,
    ITransactionImportHandler,
    type ITransactionSource
}                                 from "@monye.one/transaction";
import {
    type ITransactionSourceMapper,
    type ITransactionSourceService,
    TransactionSource,
    TransactionSourceMapper,
    TransactionSourceService
}                                 from "./sdk";
import {TransactionImportHandler} from "./service";

export interface ITransactionContainer {
    TransactionImportHandler: ITransactionImportHandler;
    TransactionSource: ITransactionSource;
    TransactionSourceService: ITransactionSourceService;
    TransactionSourceMapper: ITransactionSourceMapper;
}

export const TransactionContainer = (container: IContainer): ITransactionContainer => {
    container
        .bindClass($TransactionImportHandler, TransactionImportHandler)
        .bindClass($TransactionSource, TransactionSource)
        .bindClass($TransactionSourceService, TransactionSourceService)
        .bindClass($TransactionSourceMapper, TransactionSourceMapper);

    return {
        get TransactionImportHandler() {
            return container.resolve<ITransactionImportHandler>($TransactionImportHandler);
        },
        get TransactionSource() {
            return container.resolve<ITransactionSource>($TransactionSource);
        },
        get TransactionSourceService() {
            return container.resolve<ITransactionSourceService>($TransactionSourceService);
        },
        get TransactionSourceMapper() {
            return container.resolve<ITransactionSourceMapper>($TransactionSourceMapper);
        },
    };
};
