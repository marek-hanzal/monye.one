import {
    BaseFilter,
    type IBaseFilterProps
}                              from "@leight/filter-client";
import {
    type ITransactionFormFilterSchema,
    type ITransactionSourceSchemaType
}                              from "@monye.one/transaction";
import {type FC}               from "react";
import {TransactionFilterForm} from "../form";

export interface ITransactionFilterProps extends Omit<IBaseFilterProps<ITransactionFormFilterSchema, ITransactionSourceSchemaType>, "Form"> {
}

export const TransactionFilter: FC<ITransactionFilterProps> = (props) => {
    return <BaseFilter
        Form={TransactionFilterForm}
        {...props}
    />;
};
