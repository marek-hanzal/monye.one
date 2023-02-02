import {withHandler} from "@leight/trpc-server";
import {type ITransaction} from "@monye.one/transaction";
import {TransactionSourceContext} from "../context";

export const TransactionQueryProcedure = withHandler<void, ITransaction[]>({
    handler: async ({container}) => TransactionSourceContext(container).resolve().query(),
});
