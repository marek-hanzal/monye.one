import {
    type ITableProps,
    Table
}                from "@leight/table-client";
import {
    type ITransactionSchema,
    TransactionSchema
}                from "@monye.one/transaction";
import {type FC} from "react";

export interface ITransactionTableProps extends Partial<ITableProps<ITransactionSchema>> {
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
        hidden={[
            "reference",
            "reference",
            "reference2",
            "reference23",
            "reference233",
            "reference2",
        ]}
        order={[
            "amount",
            "reference",
            "reference2",
        ]}
        {...props}
    />;
};
