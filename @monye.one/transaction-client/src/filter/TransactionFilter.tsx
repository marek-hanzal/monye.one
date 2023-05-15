import {
    BaseFilter,
    type IBaseFilterProps
}                from "@leight/filter-client";
import {type FC} from "react";
import {
    type ITransactionFilterFormProps,
    TransactionFilterForm
}                from "../form";

export interface ITransactionFilterProps extends Omit<IBaseFilterProps, "Form"> {
    hidden?: ITransactionFilterFormProps["hidden"];
}

export const TransactionFilter: FC<ITransactionFilterProps> = ({hidden, ...props}) => {
    return <BaseFilter
        withTranslation={{
            namespace: "transaction",
        }}
        {...props}
    >
        <TransactionFilterForm
            hidden={hidden}
        />
    </BaseFilter>;
};
