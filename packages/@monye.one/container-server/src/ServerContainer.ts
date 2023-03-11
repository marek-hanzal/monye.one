import {type IContainer} from "@leight/container";
import {
    BankContainer as $BankContainer,
    type IBankContainer
}                        from "@monye.one/bank-server";
import {
    type ITransactionContainer,
    TransactionContainer as $TransactionContainer
}                        from "@monye.one/transaction-server";

export interface IServerContainer {
    BankContainer: IBankContainer;
    TransactionContainer: ITransactionContainer;
}

export const ServerContainer = (container: IContainer): IServerContainer => {
    return {
        BankContainer:        $BankContainer(container),
        TransactionContainer: $TransactionContainer(container),
    };
};
