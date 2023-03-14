import {
    type ISourceProps,
    Source
}                from "@leight/source-client";
import {
    type ITransactionQuerySchema,
    type ITransactionSchema,
    TransactionSchema
}                from "@monye.one/transaction";
import {trpc}    from "@monye.one/trpc-client";
import {type FC} from "react";
import {
    TransactionProvider,
    useTransactionQuery
}                from "../hook";

export interface ITransactionSourceProps extends Omit<ISourceProps<ITransactionQuerySchema, ITransactionSchema>, "schema" | "SourceProvider" | "useQuery" | "useQueryStore"> {
}

export const TransactionSource: FC<ITransactionSourceProps> = props => {
    return <Source
        schema={TransactionSchema}
        SourceProvider={TransactionProvider}
        useQuery={trpc.transaction.source.query.useQuery}
        useQueryStore={useTransactionQuery}
        {...props}
    />;
};
