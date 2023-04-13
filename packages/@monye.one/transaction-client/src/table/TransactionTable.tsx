import {DateInline}    from "@leight/i18n-client";
import {decimalOf}     from "@leight/prisma";
import {toHumanNumber} from "@leight/utils";
import {type FC}       from "react";
import {
    type ITransactionSourceTableProps,
    TransactionSourceTable
}                      from "../sdk";

export type ITransactionTableColumns =
    | "date"
    | "reference"
    | "account"
    | "target"
    | "note"
    | "variable"
    | "static"
    | "symbol"
    | "amount";

export interface ITransactionTableProps extends ITransactionSourceTableProps<ITransactionTableColumns> {
}

export const TransactionTable: FC<ITransactionTableProps> = props => {
    return <TransactionSourceTable
        withTranslation={{
            namespace: "transaction",
        }}
        scrollWidth={2400}
        columns={{
            date:      {
                width: 8,
                render({date}) {
                    return <DateInline date={date}/>;
                },
                sort: "date",
            },
            amount:    {
                width: 8,
                render({amount}) {
                    return toHumanNumber({number: decimalOf(amount)});
                },
                sort: "amount",
            },
            account:   {
                width:  22,
                render: transaction => transaction.bank.account,
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
            reference: {
                width:  10,
                render: "reference",
            },
        }}
        {...props}
    />;
};
