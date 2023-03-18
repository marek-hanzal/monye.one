import {
    type ISourceProps,
    Source
}                from "@leight/source-client";
import {
    type ITransactionSourceSchema,
    TransactionSchema,
}                from "@monye.one/transaction";
import {trpc}    from "@monye.one/trpc-client";
import {type FC} from "react";
import {
    TransactionProvider,
    useTransactionSort
}                from "../context";

export interface ITransactionSourceProps extends ISourceProps<ITransactionSourceSchema> {
}

export const TransactionSource: FC<ITransactionSourceProps> = props => {
    return <Source<ITransactionSourceSchema>
        schema={TransactionSchema}
        SourceProvider={TransactionProvider}
        useSourceQuery={trpc.transaction.source.query.useQuery}
        useSortState={useTransactionSort}
        {...props}
    />;
};
