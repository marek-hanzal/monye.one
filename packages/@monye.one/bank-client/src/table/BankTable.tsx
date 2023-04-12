import {type FC}            from "react";
import {
    BankSourceTable,
    type IBankSourceTableProps
}                           from "../sdk";
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
