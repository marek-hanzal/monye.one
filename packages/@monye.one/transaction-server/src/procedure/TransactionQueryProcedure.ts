import {type IWithHandler, withHandler} from "@leight/trpc-server";
import {type ITransactionEntity} from "@monye.one/transaction";
import {TransactionSourceContext} from "../context";

export const TransactionQueryProcedure: IWithHandler<void, ITransactionEntity[]> = withHandler({
    handler: async ({container}) => TransactionSourceContext(container).resolve().query(),
});
