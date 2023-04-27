import {DateInline}         from "@leight/i18n-client";
import {WithHighlight}      from "@leight/mantine";
import {toHumanNumber}      from "@leight/utils";
import {type FC}            from "react";
import {
    BankSourceTable,
    type IBankSourceTableProps
}                           from "../sdk";
import {BankTableAction}    from "./BankTableAction";
import {BankTableRowAction} from "./BankTableRowAction";

export type IBankTableColumns =
    | "account"
    | "description"
    | "balanceValue"
    | "balanceDate";

export interface IBankTableProps extends IBankSourceTableProps<IBankTableColumns> {
}

export const BankTable: FC<IBankTableProps> = props => {
    return <BankSourceTable
        pagination={{
            hideOnSingle: true,
            position:     ["bottom"],
            props:        {
                withControls: false,
            },
        }}
        WithTableAction={BankTableAction}
        WithRowAction={BankTableRowAction}
        withTranslation={{
            namespace: "bank",
        }}
        columns={{
            account:      {
                width:  16,
                render: ({item: {account}, highlight}) => <WithHighlight text={account} highlight={highlight}/>,
            },
            description:  {
                render: ({item: {description}, highlight}) => <WithHighlight text={description} highlight={highlight}/>,
            },
            balanceValue: {
                width:  10,
                render: ({item: {balance}}) => toHumanNumber({number: balance?.value}),
            },
            balanceDate:  {
                width:  10,
                render: ({item: {balance}}) => <DateInline date={balance?.date}/>,
            },
        }}
        {...props}
    />;
};
