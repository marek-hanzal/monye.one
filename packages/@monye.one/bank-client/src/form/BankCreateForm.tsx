import {TextInput} from "@leight/form-client";
import {type FC}   from "react";
import {
    BankCreateBaseForm,
    BankCreateInput,
    type IBankCreateBaseFormProps
}                  from "../sdk";

export interface IBankCreateForm extends Omit<IBankCreateBaseFormProps, "withMapper" | "inputs"> {
}

export const BankCreateForm: FC<IBankCreateForm> = props => {
    return <BankCreateBaseForm
        withMapper={values => ({
            ...values,
            id:     "123",
            userId: "123",
        })}
        onSubmit={({request}) => {
            console.log("BankCreateBaseForm", request);
        }}
        inputs={() => ({
            "account": ({mandatory, withLabelPlaceholder}) => <TextInput
                {...mandatory}
                {...withLabelPlaceholder}
                withAsterisk
            />,
        })}
        {...props}
    >
        <BankCreateInput path={"account"}/>
    </BankCreateBaseForm>;
};
