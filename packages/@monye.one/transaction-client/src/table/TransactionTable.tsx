import {DateInline}    from "@leight/i18n-client";
import {WithHighlight} from "@leight/mantine";
import {decimalOf}     from "@leight/prisma";
import {type FC}       from "react";
import {
    type ITransactionSourceTableProps,
    TransactionSourceTable
}                      from "../sdk";
import {AmountInline}  from "../ui";

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
        withFulltext
        withTranslation={{
            namespace: "transaction",
        }}
        scrollWidth={2400}
        columns={{
            date:      {
                width: 8,
                render({item: {date}}) {
                    return <DateInline date={date}/>;
                },
                sort: "date",
            },
            amount:    {
                width: 8,
                render({item: {amount}}) {
                    return <AmountInline amount={amount}/>;
                },
                sort: "amount",
            },
            account:   {
                width:  22,
                render: ({item: {bank: {account}}, highlight}) => <WithHighlight text={account} highlight={highlight}/>,
            },
            target:    {
                width:  22,
                render: "target",
            },
            note:      {
                render: ({item: {note}, highlight}) => <WithHighlight text={note} highlight={highlight}/>,
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
        renderFooter={({items, columns}) => columns ? <th colSpan={columns.length - 1}>
            <AmountInline amount={items.reduce((prev, current) => prev + decimalOf(current.amount), 0)}/>
        </th> : null}
        {...props}
    />;
};
