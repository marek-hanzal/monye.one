import {withHandler} from "@leight/trpc-server";
import {type ITransactionEntity} from "@monye.one/transaction";
import {TransactionSourceContext} from "../context";

export const TransactionQueryProcedure = withHandler<void, ITransactionEntity[]>({
    handler: async ({container}) => TransactionSourceContext(container).resolve().query(),
});
