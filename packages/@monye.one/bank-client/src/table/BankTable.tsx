import {type FC}            from "react";
import {
    BankSourceTable,
    type IBankSourceTableProps
}                           from "../sdk";
import {BankTableAction}    from "./BankTableAction";
import {BankTableRowAction} from "./BankTableRowAction";

export type IBankTableColumns =
    | "account";

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
            account: {
                render: "account",
                sort:   "account",
            },
        }}
        {...props}
    />;
};
