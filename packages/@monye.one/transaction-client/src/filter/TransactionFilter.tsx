import {
    BaseFilter,
    type IBaseFilterProps
}                                          from "@leight/mantine";
import {type ITransactionSourceSchemaType} from "@monye.one/transaction";
import {type FC}                           from "react";

export interface ITransactionFilterProps extends IBaseFilterProps<ITransactionSourceSchemaType> {
}

export const TransactionFilter: FC<ITransactionFilterProps> = (props) => {
    return <BaseFilter
        {...props}
    />;
};
