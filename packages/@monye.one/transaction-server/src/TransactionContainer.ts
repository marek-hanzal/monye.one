import {type IContainer} from '@leight/container';
import {$TransactionImportService, type ITransactionImportService} from "@monye.one/transaction";
import {TransactionImportService} from "./service";

export interface ITransactionContainer {
    TransactionImportService: ITransactionImportService;
}

export const TransactionContainer = (container: IContainer): ITransactionContainer => {
    container.register<ITransactionImportService>($TransactionImportService, {
        useClass: TransactionImportService,
    })

    return {
        get TransactionImportService() {
            return container.resolve<ITransactionImportService>($TransactionImportService);
        }
    }
}
