import {type IContainer} from '@leight/container';
import {
    $TransactionImportService,
    $TransactionSource,
    type ITransactionImportService,
    type ITransactionSource
} from "@monye.one/transaction";
import {TransactionImportService} from "./service";

export interface ITransactionContainer {
    TransactionImportService: ITransactionImportService;
    TransactionSource: ITransactionSource;
}

export const TransactionContainer = (container: IContainer): ITransactionContainer => {
    container.register<ITransactionImportService>($TransactionImportService, {
        useClass: TransactionImportService,
    })

    return {
        get TransactionImportService() {
            return container.resolve<ITransactionImportService>($TransactionImportService);
        },
        get TransactionSource() {
            return container.resolve<ITransactionSource>($TransactionSource);
        },
    }
}
