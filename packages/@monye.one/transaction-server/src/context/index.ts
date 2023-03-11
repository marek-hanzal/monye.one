import {
    type IContainer,
    ServiceContext
} from "@leight/container";
import {
    $TransactionSource,
    type ITransactionSource
} from "@monye.one/transaction";

export const TransactionSourceContext = (container: IContainer) => new ServiceContext<ITransactionSource>(container, $TransactionSource);
