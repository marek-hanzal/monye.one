// Generated file
import {
	type ISourceProps,
	Source
} from "@leight/source-client";
import {
	type IQueryProviderProps,
	QueryProvider
} from "@leight/query-client";
import {
	type ITransactionSourceSchema,
	TransactionSchema
} from "@monye.one/transaction";
import {type FC} from "react";
import {
	TransactionProvider,
	TransactionSortProvider,
	useTransactionSort
} from "./client-context";
import {trpc} from "@monye.one/trpc-client";

export interface ITransactionSourceProps extends ISourceProps<ITransactionSourceSchema> {
}

export interface ITransactionQueryProviderProps extends IQueryProviderProps<ITransactionSourceSchema> {
}

export const TransactionSource:FC<ITransactionSourceProps> = props => {
    return <Source<ITransactionSourceSchema>
        schema={TransactionSchema}
        SourceProvider={TransactionProvider}
        useSourceQuery={trpc.transaction.source.query.useQuery}
        useSortState={useTransactionSort}
        {...props}
    />;
};
export const TransactionQueryProvider:FC<ITransactionQueryProviderProps> = props => {
    return <QueryProvider<ITransactionSourceSchema>
        useCountQuery={trpc.transaction.source.count.useQuery}
        SortProvider={TransactionSortProvider}
        {...props}
    />;
};