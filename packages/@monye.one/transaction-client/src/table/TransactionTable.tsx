import {Date}              from "@leight/i18n-client";
import {Decimal}           from "@leight/prisma";
import {
    type ITableProps,
    Table
}                          from "@leight/table-client";
import {toHumanNumber}     from "@leight/utils";
import {
    type ITransactionSourceSchema,
    TransactionSchema,
}                          from "@monye.one/transaction";
import {type FC}           from "react";
import {
    useTransactionSort,
    useTransactionSource
}                          from "../context";
import {TransactionSource} from "../source";

export type ITransactionTableColumns =
    | "date"
    | "reference"
    | "target"
    | "note"
    | "variable"
    | "static"
    | "symbol"
    | "amount";

export interface ITransactionTableProps extends ITableProps<ITransactionSourceSchema, ITransactionTableColumns> {
}

export const TransactionTable: FC<ITransactionTableProps> = ({...props}) => {
    return <TransactionSource>
        <Table
            useSource={useTransactionSource}
            useSort={useTransactionSort}
            schema={TransactionSchema}
            withTranslation={{
                namespace: "transaction",
            }}
            scrollX={2400}
            columns={{
                date:      {
                    width: 8,
                    render({date}) {
                        return <Date input={date}/>;
                    },
                    sort: "date",
                },
                reference: {
                    width:  10,
                    render: "reference",
                },
                amount:    {
                    width: 8,
                    render({amount}) {
                        return toHumanNumber({number: (new Decimal(`${amount}`)).toNumber()});
                    },
                    sort: "amount",
                },
                target:    {
                    width:  22,
                    render: "target",
                },
                note:      {
                    render: "note",
                },
                variable:  {
                    width:  10,
                    render: "variable",
                },
                static:    {
                    width:  10,
                    render: "static",
                },
                symbol:    {
                    width:  10,
                    render: "symbol",
                },
            }}
            {...props}
        />
    </TransactionSource>;
};
