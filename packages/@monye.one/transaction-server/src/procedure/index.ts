import {withSourceProcedure} from "@leight/trpc-server";
import {
    $TransactionSource,
    type ITransactionSourceSchema,
    TransactionQuerySchema
}                            from "@monye.one/transaction";

export const TransactionSourceProcedure = withSourceProcedure<ITransactionSourceSchema>({
    source: $TransactionSource,
    schema: TransactionQuerySchema,
});
