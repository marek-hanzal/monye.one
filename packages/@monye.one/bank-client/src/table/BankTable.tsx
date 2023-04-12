import {type FC} from "react";
import {
    BankSourceTable,
    type IBankSourceTableProps
}                from "../sdk";

export type IBankTableColumns =
    | "account";

export interface IBankTableProps extends IBankSourceTableProps<IBankTableColumns> {
}

export const BankTable: FC<IBankTableProps> = props => {
    return <BankSourceTable
        pagination={["bottom"]}
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
