import {withHandler} from "@leight/trpc-server";
import {$TransactionSource, type ITransactionSourceSchemaType, type ITransactionSumBy} from "@monye.one/transaction";
import {TransactionRepository} from "../source";

export const SumByProcedure = withHandler<ITransactionSourceSchemaType["Filter"] | undefined, ITransactionSumBy>({
    handler: ({request, container}) => container.resolve<TransactionRepository>($TransactionSource).sumBy(request),
});
