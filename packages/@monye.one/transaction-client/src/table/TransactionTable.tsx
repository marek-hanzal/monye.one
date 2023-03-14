import {
    type ITableExProps,
    Table
}                          from "@leight/table-client";
import {
    type ITransactionSchema,
    TransactionSchema
}                          from "@monye.one/transaction";
import {type FC}           from "react";
import {TransactionSource} from "../source";

export type ITransactionTableColumns =
    "reference"
    | "note"
    | "variable"
    | "static"
    | "symbol"
    | "amount";

export interface ITransactionTableProps extends ITableExProps<ITransactionSchema, ITransactionTableColumns> {
}

export const TransactionTable: FC<ITransactionTableProps> = ({...props}) => {
    return <TransactionSource>
        {sourceContext => <Table
            useSource={() => sourceContext.state}
            schema={TransactionSchema}
            withTranslation={{
                namespace: "transaction",
            }}
            columns={{
                "reference": {
                    render: "reference",
                },
                "amount":    {
                    render({amount}) {
                        return `${amount}`;
                    },
                },
                "variable":  {
                    render: "variable",
                },
                "static":    {
                    render: "static",
                },
                "symbol":    {
                    render: "symbol",
                },
                "note":      {
                    render: "note",
                },
            }}
            {...props}
        />}
    </TransactionSource>;
};
