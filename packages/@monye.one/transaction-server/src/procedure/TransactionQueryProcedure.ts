import {withHandler} from "@leight/trpc-server";
import {type ITransaction} from "@monye.one/transaction";

export const TransactionQueryProcedure = withHandler<void, ITransaction[]>({
    handler: async () => {
        return [];
    },
});
