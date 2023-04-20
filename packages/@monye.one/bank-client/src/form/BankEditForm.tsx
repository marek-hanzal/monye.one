import {type FC}                  from "react";
import {
    BankEditBaseForm,
    type IBankEditBaseFormProps
}                                 from "../sdk";
import {BankEditFormInputFactory} from "./BankEditFormInputFactory";

export interface IBankEditFormProps extends Omit<IBankEditBaseFormProps, "toRequest" | "inputs"> {
}

export const BankEditForm: FC<IBankEditFormProps> = props => {
    return <BankEditBaseForm
        toRequest={({values, dto}) => ({
            id: dto.id,
            ...values,
        })}
        inputs={BankEditFormInputFactory}
        {...props}
    />;
};
