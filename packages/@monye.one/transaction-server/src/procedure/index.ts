import {withHandler}                   from "@leight/trpc-server";
import {type ITransactionSourceSchema} from "@monye.one/transaction";
import {TransactionSourceContext}      from "../context";

export const TransactionQueryProcedure = withHandler<void, ITransactionSourceSchema["Entity"][]>({
    handler: async ({container}) => TransactionSourceContext(container).resolve().query(),
});
