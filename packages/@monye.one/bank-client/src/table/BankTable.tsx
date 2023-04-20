import {DateInline}         from "@leight/i18n-client";
import {toHumanNumber}      from "@leight/utils";
import {type FC}            from "react";
import {
    BankSourceTable,
    type IBankSourceTableProps
}                           from "../sdk/ClientTable/BankSourceTable";
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
                render: "account",
                sort:   "account",
                width:  16,
            },
            description:  {
                render: "description",
            },
            balanceValue: {
                width: 10,
                render: ({balance}) => toHumanNumber({number: balance?.value}),
            },
            balanceDate:  {
                width: 10,
                render: ({balance}) => <DateInline date={balance?.date}/>,
            },
        }}
        {...props}
    />;
};
