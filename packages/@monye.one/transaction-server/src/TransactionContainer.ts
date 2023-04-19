import {type IContainer}          from "@leight/container";
import {
    $TransactionImportService,
    $TransactionSource,
    $TransactionSourceMapper,
    type ITransactionImportService,
    type ITransactionSource
}                                 from "@monye.one/transaction";
import {
    type ITransactionSourceMapper,
    TransactionSource,
    TransactionSourceMapper
}                                 from "./sdk";
import {TransactionImportService} from "./service";

export interface ITransactionContainer {
    TransactionImportService: ITransactionImportService;
    TransactionSource: ITransactionSource;
    TransactionSourceMapper: ITransactionSourceMapper;
}

export const TransactionContainer = (container: IContainer): ITransactionContainer => {
    container
        .bindClass($TransactionImportService, TransactionImportService)
        .bindClass($TransactionSource, TransactionSource)
        .bindClass($TransactionSourceMapper, TransactionSourceMapper);

    return {
        get TransactionImportService() {
            return container.resolve<ITransactionImportService>($TransactionImportService);
        },
        get TransactionSource() {
            return container.resolve<ITransactionSource>($TransactionSource);
        },
        get TransactionSourceMapper() {
            return container.resolve<ITransactionSourceMapper>($TransactionSourceMapper);
        },
    };
};
