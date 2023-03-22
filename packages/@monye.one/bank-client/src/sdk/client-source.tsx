import {
	type ISourceProps,
	Source
} from "@leight/source-client";
import {
	type IQueryProviderProps,
	QueryProvider
} from "@leight/query-client";
import {
	type IBankSourceSchema,
	BankSchema
} from "@monye.one/bank";
import {trpc} from "@monye.one/trpc-client";
import {type FC} from "react";
import {
	BankProvider,
	BankSortProvider,
	useBankSort
} from "./client-context";

export interface IBankSourceProps extends ISourceProps<IBankSourceSchema> {
}

export interface IBankQueryProviderProps extends IQueryProviderProps<IBankSourceSchema> {
}

export const BankSource:FC<IBankSourceProps> = props => {
    return <Source<IBankSourceSchema>
        schema={BankSchema}
        SourceProvider={BankProvider}
        useSourceQuery={trpc.bank.source.query.useQuery}
        useSortState={useBankSort}
        {...props}
    />;
};
export const BankQueryProvider:FC<IBankQueryProviderProps> = props => {
    return <QueryProvider<IBankSourceSchema>
        useCountQuery={trpc.bank.source.count.useQuery}
        SortProvider={BankSortProvider}
        {...props}
    />;
};