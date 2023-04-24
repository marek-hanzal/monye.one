import {withHandler}       from "@leight/trpc-server";
import {
    $TransactionSource,
    type ITransactionSourceSchemaType,
    type ITransactionSumBy
}                          from "@monye.one/transaction";
import {TransactionSource} from "../sdk";

export const SumByProcedure = withHandler<ITransactionSourceSchemaType["Filter"] | undefined, ITransactionSumBy>({
    handler: ({request, container}) => container.resolve<TransactionSource>($TransactionSource).sumBy(request),
});
