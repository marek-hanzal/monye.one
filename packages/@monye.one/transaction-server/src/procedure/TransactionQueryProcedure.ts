import {type IWithHandler, withHandler} from "@leight/trpc-server";
import {type ITransactionEntity} from "@monye.one/transaction";
import {TransactionSourceContext} from "../context";

export interface ITransactionQueryProcedure extends IWithHandler<void, ITransactionEntity[]> {
}

export const TransactionQueryProcedure: ITransactionQueryProcedure = withHandler({
    handler: async ({container}) => TransactionSourceContext(container).resolve().query(),
});
