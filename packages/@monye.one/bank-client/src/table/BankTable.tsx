import {
    type ITableProps,
    Table
}                from "@leight/table-client";
import {
    BankSchema,
    type IBankSourceSchema,
}                from "@monye.one/bank";
import {type FC} from "react";
import {
    BankSource,
    useBankSort,
    useBankSource
}                from "../sdk";

export type IBankTableColumns =
    | "account";

export interface IBankTableProps extends ITableProps<IBankSourceSchema, IBankTableColumns> {
}

export const BankTable: FC<IBankTableProps> = ({...props}) => {
    return <BankSource>
        <Table
            useSource={useBankSource}
            useSort={useBankSort}
            schema={BankSchema}
            withTranslation={{
                namespace: "bank",
            }}
            columns={{
                account: {
                    render: "account",
                },
            }}
            {...props}
        />
    </BankSource>;
};
