import {type IContainer} from "@leight/container";
import {
    $TransactionImportHandler,
    $TransactionKeywordService,
    $TransactionSource,
    $TransactionSourceMapper,
    $TransactionSourceService,
    type ITransactionImportHandler,
    type ITransactionKeywordService,
    ITransactionKeywordSource,
    type ITransactionSource
}                        from "@monye.one/transaction";
import {
    type ITransactionSourceMapper,
    type ITransactionSourceService,
    TransactionSource,
    TransactionSourceMapper,
    TransactionSourceService
}                        from "./sdk";
import {
    TransactionImportHandler,
    TransactionKeywordService
}                        from "./service";

export interface ITransactionContainer {
    TransactionImportHandler: ITransactionImportHandler;
    TransactionSource: ITransactionSource;
    TransactionSourceService: ITransactionSourceService;
    TransactionSourceMapper: ITransactionSourceMapper;
    TransactionKeywordSource: ITransactionKeywordSource;
    TransactionKeywordSourceService: ITransactionKeywordSourceService;
    TransactionKeywordSourceMapper: ITransactionKeywordSourceMapper;
    TransactionKeywordService: ITransactionKeywordService;
}

export const TransactionContainer = (container: IContainer): ITransactionContainer => {
    container
        .bindClass($TransactionImportHandler, TransactionImportHandler)
        .bindClass($TransactionSource, TransactionSource)
        .bindClass($TransactionSourceService, TransactionSourceService)
        .bindClass($TransactionSourceMapper, TransactionSourceMapper)
        .bindClass($TransactionKeywordService, TransactionKeywordService);

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
        get TransactionKeywordService() {
            return container.resolve<ITransactionKeywordService>($TransactionKeywordService);
        },
    };
};
