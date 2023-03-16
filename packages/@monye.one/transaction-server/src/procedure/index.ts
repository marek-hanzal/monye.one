import {withHandler}                   from "@leight/trpc-server";
import {type ITransactionSourceSchema} from "@monye.one/transaction";
import {TransactionSourceContext}      from "../context";

export const TransactionQueryProcedure = withHandler<ITransactionSourceSchema["Query"], ITransactionSourceSchema["Entity"][]>({
    handler: async ({container, request}) => TransactionSourceContext(container).resolve().query(request),
});

export const TransactionQueryCountProcedure = withHandler<ITransactionSourceSchema["Query"], number>({
    handler: async ({container, request}) => TransactionSourceContext(container).resolve().count(request),
});
