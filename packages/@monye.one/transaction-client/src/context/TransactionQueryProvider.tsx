import {
    type IQueryProviderProps,
    QueryProvider
}                from "@leight/query-client";
import {type FC} from "react";

export interface ITransactionQueryProviderProps extends IQueryProviderProps {
}

export const TransactionQueryProvider: FC<ITransactionQueryProviderProps> = props => {
    return <QueryProvider
        {...props}
    />;
};
