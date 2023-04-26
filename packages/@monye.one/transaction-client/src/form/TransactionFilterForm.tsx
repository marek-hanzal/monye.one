import {type FC} from "react";
import {
    type ITransactionFilterBaseFormProps,
    TransactionFilterBaseForm
}                from "../sdk";

export interface ITransactionFilterFormProps extends ITransactionFilterBaseFormProps {
}

export const TransactionFilterForm: FC<ITransactionFilterFormProps> = () => {
    return <TransactionFilterBaseForm
        toRequest={value => value}
        inputs={{
            "bankId": () => null,
        }}
    >
    </TransactionFilterBaseForm>;
};
