import {
    type IQueryProviderProps,
    QueryProvider
}                                      from "@leight/query-client";
import {type ITransactionSourceSchema} from "@monye.one/transaction";
import {trpc}                          from "@monye.one/trpc-client";
import {type FC}                       from "react";
import {TransactionSortProvider}       from "./TransactionSortProvider";

export interface ITransactionQueryProviderProps extends IQueryProviderProps<ITransactionSourceSchema> {
}

export const TransactionQueryProvider: FC<ITransactionQueryProviderProps> = props => {
    return <QueryProvider<ITransactionSourceSchema>
        useCountQuery={trpc.transaction.source.count.useQuery}
        SortProvider={TransactionSortProvider}
        {...props}
    />;
};

