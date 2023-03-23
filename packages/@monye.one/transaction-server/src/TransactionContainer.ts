import {type IContainer}          from "@leight/container";
import {
    $TransactionImportService,
    $TransactionSource,
    type ITransactionImportService,
    type ITransactionSource
}                                 from "@monye.one/transaction";
import {TransactionSource}        from "./sdk";
import {TransactionImportService} from "./service";

export interface ITransactionContainer {
    TransactionImportService: ITransactionImportService;
    TransactionSource: ITransactionSource;
}

export const TransactionContainer = (container: IContainer): ITransactionContainer => {
    container
        .bindClass($TransactionImportService, TransactionImportService)
        .bindClass($TransactionSource, TransactionSource);

    return {
        get TransactionImportService() {
            return container.resolve<ITransactionImportService>($TransactionImportService);
        },
        get TransactionSource() {
            return container.resolve<ITransactionSource>($TransactionSource);
        },
    };
};
