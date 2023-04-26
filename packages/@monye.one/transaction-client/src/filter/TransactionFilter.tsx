import {
    BaseFilter,
    type IBaseFilterProps
}                from "@leight/mantine";
import {
    type ITransactionFormFilterSchema,
    type ITransactionSourceSchemaType
}                from "@monye.one/transaction";
import {type FC} from "react";

export interface ITransactionFilterProps extends Omit<IBaseFilterProps<ITransactionFormFilterSchema, ITransactionSourceSchemaType>, "Form"> {
}

export const TransactionFilter: FC<ITransactionFilterProps> = (props) => {
    return <BaseFilter
        {...props}
    />;
};
