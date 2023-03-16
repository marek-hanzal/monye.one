import {
    createSourceContext,
    type ISourceProps
} from "@leight/source-client";
import {
    type ITransactionSourceSchema,
    TransactionSchema
} from "@monye.one/transaction";

export type ITransactionSource = ISourceProps<ITransactionSourceSchema>;

export const {
                 Provider:         TransactionProvider,
                 useState:         useTransactionSource,
                 useOptionalState: useOptionalTransactionSource,
                 useStore:         useTransactionStore,
                 useOptionalStore: useOptionalTransactionStore,
             } = createSourceContext<ITransactionSourceSchema>({
    name:   "Transaction",
    schema: TransactionSchema,
});
