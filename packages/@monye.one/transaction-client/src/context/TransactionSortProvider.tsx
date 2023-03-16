import { createSortContext } from "@leight/sort-client";
import {
    type ITransactionSortSchema,
    TransactionSortSchema,
} from "@monye.one/transaction";

export const {
    Provider: TransactionSortProvider,
    useState: useTransactionSort,
    useOptionalState: useOptionalTransactionSort,
    useStore: useTransactionSortStore,
    useOptionalStore: useOptionalTransactionSortStore,
} = createSortContext<ITransactionSortSchema>({
    name: "TransactionSort",
    schema: TransactionSortSchema,
});
