import {
    BaseFilter,
    type IBaseFilterProps
}                              from "@leight/filter-client";
import {type FC}               from "react";
import {TransactionFilterForm} from "../form";

export interface ITransactionFilterProps extends Omit<IBaseFilterProps, "Form"> {
}

export const TransactionFilter: FC<ITransactionFilterProps> = props => {
    return <BaseFilter
        withTranslation={{
            namespace: "transaction",
        }}
        {...props}
    >
        <TransactionFilterForm/>
    </BaseFilter>;
};
