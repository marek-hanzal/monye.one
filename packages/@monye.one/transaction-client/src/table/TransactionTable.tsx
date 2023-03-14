import {
    type ITableProps,
    Table
}                from "@leight/table-client";
import {
    type ITransactionSchema,
    TransactionSchema
}                from "@monye.one/transaction";
import {type FC} from "react";

export type ITransactionTableColumns =
    "reference"
    | "amount";

export interface ITransactionTableProps extends Partial<ITableProps<ITransactionSchema, ITransactionTableColumns>> {
}

export const TransactionTable: FC<ITransactionTableProps> = ({...props}) => {
    return <Table
        schema={TransactionSchema}
        withTranslation={{
            namespace: "transaction",
        }}
        columns={{
            "reference": {
                render(entity) {
                    return entity.reference;
                },
            },
            "amount":    {
                render(entity) {
                    return `${entity.amount}`;
                },
            },
        }}
        order={[
            "amount",
            "reference",
        ]}
        {...props}
    />;
};
