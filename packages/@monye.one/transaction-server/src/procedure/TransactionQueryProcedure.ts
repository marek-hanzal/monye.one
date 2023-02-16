import {withHandler}                   from "@leight/trpc-server";
import {type ITransactionSourceConfig} from "@monye.one/transaction";
import {TransactionSourceContext}      from "../context";

export const TransactionQueryProcedure = withHandler<void, ITransactionSourceConfig["Entity"][]>({
    handler: async ({container}) => TransactionSourceContext(container).resolve().query(),
});
