import {
    createSourceContext,
    type ISourceProps
} from "@leight/source-client";
import {
    ITransactionQuerySchema,
    type ITransactionSchema,
    TransactionSchema
} from "@monye.one/transaction";

export type ITransactionSource = ISourceProps<ITransactionQuerySchema, ITransactionSchema>;

export const {
                 Provider:         TransactionProvider,
                 useState:         useTransactionSource,
                 useOptionalState: useOptionalTransactionSource,
                 useStore:         useTransactionStore,
                 useOptionalStore: useOptionalTransactionStore,
             } = createSourceContext<ITransactionSchema>({
    name:   "Transaction",
    schema: TransactionSchema,
});
