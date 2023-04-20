import {type IContainer}          from "@leight/container";
import {
    $TransactionImportService,
    $TransactionSource,
    $TransactionSourceMapper,
    $TransactionSourceService,
    type ITransactionImportService,
    type ITransactionSource
}                                 from "@monye.one/transaction";
import {
    type ITransactionSourceMapper,
    type ITransactionSourceService,
    TransactionSource,
    TransactionSourceMapper,
    TransactionSourceService
}                                 from "./sdk";
import {TransactionImportService} from "./service";

export interface ITransactionContainer {
    TransactionImportService: ITransactionImportService;
    TransactionSource: ITransactionSource;
    TransactionSourceService: ITransactionSourceService;
    TransactionSourceMapper: ITransactionSourceMapper;
}

export const TransactionContainer = (container: IContainer): ITransactionContainer => {
    container
        .bindClass($TransactionImportService, TransactionImportService)
        .bindClass($TransactionSource, TransactionSource)
        .bindClass($TransactionSourceService, TransactionSourceService)
        .bindClass($TransactionSourceMapper, TransactionSourceMapper);

    return {
        get TransactionImportService() {
            return container.resolve<ITransactionImportService>($TransactionImportService);
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
