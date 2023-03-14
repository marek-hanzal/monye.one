import {
    type ISourceProps,
    Source
}                            from "@leight/source-client";
import {
    type ITransactionSchema,
    TransactionSchema
}                            from "@monye.one/transaction";
import {type FC}             from "react";
import {TransactionProvider} from "../hook";

export interface ITransactionSourceProps extends Omit<ISourceProps<ITransactionSchema>, "schema" | "SourceProvider"> {
}

export const TransactionSource: FC<ITransactionSourceProps> = props => {
    return <Source
        schema={TransactionSchema}
        SourceProvider={TransactionProvider}
        {...props}
    />;
};
