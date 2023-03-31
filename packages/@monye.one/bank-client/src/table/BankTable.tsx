import {
    type ISourceTableProps,
    SourceTable
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

export interface IBankTableProps extends ISourceTableProps<IBankSourceSchema, IBankTableColumns> {
}

export const BankTable: FC<IBankTableProps> = ({...props}) => {
    return <BankSource>
        <SourceTable
            useSource={useBankSource}
            useSort={useBankSort}
            schema={BankSchema}
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
        />
    </BankSource>;
};
