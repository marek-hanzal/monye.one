import {type IContainer} from '@leight/container';
import {type ITransactionContainer, TransactionContainer as $TransactionContainer} from "@monye.one/transaction-server";

export interface IServerContainer {
    TransactionContainer: ITransactionContainer;
}

export const ServerContainer = (container: IContainer): IServerContainer => {
    return {
        TransactionContainer: $TransactionContainer(container),
    }
}
