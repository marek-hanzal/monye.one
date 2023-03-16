import { type ITableProps, Table } from "@leight/table-client";
import {
    ITransactionSourceSchema,
    TransactionSchema,
} from "@monye.one/transaction";
import { type FC } from "react";
import { useTransactionSource } from "../context";
import { TransactionSource } from "../source";

export type ITransactionTableColumns =
    | "reference"
    | "note"
    | "variable"
    | "static"
    | "symbol"
    | "amount";

export interface ITransactionTableProps
    extends ITableProps<ITransactionSourceSchema, ITransactionTableColumns> {}

export const TransactionTable: FC<ITransactionTableProps> = ({ ...props }) => {
    return (
        <TransactionSource>
            <Table
                useSource={useTransactionSource}
                schema={TransactionSchema}
                withTranslation={{
                    namespace: "transaction",
                }}
                columns={{
                    reference: {
                        render: "reference",
                    },
                    amount: {
                        render({ amount }) {
                            return `${amount}`;
                        },
                    },
                    variable: {
                        render: "variable",
                    },
                    static: {
                        render: "static",
                    },
                    symbol: {
                        render: "symbol",
                    },
                    note: {
                        render: "note",
                    },
                }}
                {...props}
            />
        </TransactionSource>
    );
};
