import {
    type ITableExProps,
    Table
}                             from "@leight/table-client";
import {
    type ITransactionSchema,
    TransactionSchema
}                             from "@monye.one/transaction";
import {type FC}              from "react";
import {useTransactionSource} from "../hook";
import {TransactionSource}    from "../source";

export type ITransactionTableColumns =
    "reference"
    | "amount";

export interface ITransactionTableProps extends ITableExProps<ITransactionSchema, ITransactionTableColumns> {
}

export const TransactionTable: FC<ITransactionTableProps> = ({...props}) => {
    return <TransactionSource>
        <Table
            useSource={useTransactionSource}
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
            {...props}
        />
    </TransactionSource>;
};
