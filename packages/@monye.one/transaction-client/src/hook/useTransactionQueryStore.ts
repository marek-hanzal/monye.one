import {
    createQueryContext,
    type IQueryStoreProps
} from "@leight/query-client";
import {
    type ITransactionQuerySchema,
    TransactionQuerySchema
} from "@monye.one/transaction";

export type ITransactionQueryStore = IQueryStoreProps<ITransactionQuerySchema>;

export const {
                 Provider:         TransactionQueryProvider,
                 useState:         useTransactionQuery,
                 useOptionalState: useOptionalTransactionQuery,
                 useStore:         useTransactionQueryStore,
                 useOptionalStore: useOptionalTransactionQueryStore,
             } = createQueryContext<ITransactionQuerySchema>({
    name:   "TransactionQuery",
    schema: TransactionQuerySchema,
});
