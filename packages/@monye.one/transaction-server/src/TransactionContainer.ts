import {type IContainer} from "@leight/container";
import {
    $TransactionImportHandler,
    $TransactionKeywordService,
    $TransactionKeywordSource,
    $TransactionKeywordSourceMapper,
    $TransactionKeywordSourceService,
    $TransactionSource,
    $TransactionSourceMapper,
    $TransactionSourceService,
    type ITransactionImportHandler,
    type ITransactionKeywordService,
    type ITransactionKeywordSource,
    type ITransactionKeywordSourceMapper,
    type ITransactionSource,
    type ITransactionSourceMapper
}                        from "@monye.one/transaction";
import {
    type ITransactionKeywordSourceService,
    type ITransactionSourceService,
    TransactionBaseSourceMapper,
    TransactionBaseSourceService,
    TransactionKeywordBaseSourceMapper,
    TransactionKeywordBaseSourceService
}                        from "./sdk";
import {
    TransactionImportHandler,
    TransactionKeywordService
}                        from "./service";
import {
    TransactionKeywordSource,
    TransactionSource
}                        from "./source";

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
        .bindClass($TransactionSourceService, TransactionBaseSourceService)
        .bindClass($TransactionSourceMapper, TransactionBaseSourceMapper)

        .bindClass($TransactionKeywordSource, TransactionKeywordSource)
        .bindClass($TransactionKeywordSourceService, TransactionKeywordBaseSourceService)
        .bindClass($TransactionKeywordSourceMapper, TransactionKeywordBaseSourceMapper)

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
        get TransactionKeywordSource() {
            return container.resolve<ITransactionKeywordSource>($TransactionKeywordSource);
        },
        get TransactionKeywordSourceService() {
            return container.resolve<ITransactionKeywordSourceService>($TransactionKeywordSourceService);
        },
        get TransactionKeywordSourceMapper() {
            return container.resolve<ITransactionKeywordSourceMapper>($TransactionKeywordSourceMapper);
        },

        get TransactionKeywordService() {
            return container.resolve<ITransactionKeywordService>($TransactionKeywordService);
        },
    };
};
