import {DateInline}        from "@leight/i18n-client";
import {WithHighlight}     from "@leight/mantine";
import {type FC}           from "react";
import {TransactionFilter} from "../filter";
import {
    type ITransactionSourceTableProps,
    TransactionSourceTable
}                          from "../sdk";
import {AmountInline}      from "../ui";

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
        filter={<TransactionFilter/>}
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
                render: ({item: {bank: {account, description}}, highlight}) => <WithHighlight text={description ? `${account} (${description})` : account} highlight={highlight}/>,
            },
            target:    {
                width:  22,
                render: ({item: {target}, highlight}) => <WithHighlight text={target} highlight={highlight}/>,
            },
            note:      {
                render: ({item: {note}, highlight}) => <WithHighlight text={note} highlight={highlight}/>,
            },
            variable:  {
                width:  10,
                render: ({item: {variable}, highlight}) => <WithHighlight text={variable} highlight={highlight}/>,
            },
            static:    {
                width:  10,
                render: ({item: {static: $static}, highlight}) => <WithHighlight text={$static} highlight={highlight}/>,
            },
            symbol:    {
                width:  10,
                render: ({item: {symbol: $symbol}, highlight}) => <WithHighlight text={$symbol} highlight={highlight}/>,
            },
            reference: {
                width:  10,
                render: ({item: {reference}, highlight}) => <WithHighlight text={reference} highlight={highlight}/>,
            },
        }}
        {...props}
    />;
};
