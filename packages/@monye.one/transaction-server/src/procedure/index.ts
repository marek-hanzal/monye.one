import {
    withSourceCountHandler,
    withSourceHandler
}                                      from "@leight/trpc-server";
import {type ITransactionSourceSchema} from "@monye.one/transaction";
import {TransactionSourceContext}      from "../context";

export const TransactionQueryProcedure = withSourceHandler<ITransactionSourceSchema>({
    handler: async ({container, request}) => TransactionSourceContext(container).resolve().query(request),
});

export const TransactionQueryCountProcedure = withSourceCountHandler<ITransactionSourceSchema>({
    handler: async ({container, request}) => TransactionSourceContext(container).resolve().count(request),
});
