import {type IContainer} from "@leight/container";
import {withBankContainer} from "@monye.one/bank-server";
import {withBookContainer} from "@monye.one/book-server";
import {withTransactionContainer} from "@monye.one/transaction-server";

export const withServerContainer = (container: IContainer) => {
    withBankContainer(container);
    withTransactionContainer(container);
    withBookContainer(container);
};
