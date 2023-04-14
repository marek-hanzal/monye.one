import {TextInput} from "@leight/form-client";
import {type FC}   from "react";
import {
    BankCreateBaseForm,
    BankCreateFormStoreContext,
    type IBankCreateBaseFormProps
}                  from "../sdk";

export interface IBankCreateForm extends IBankCreateBaseFormProps {
}

export const BankCreateForm: FC<IBankCreateForm> = props => {
    return <BankCreateBaseForm
        {...props}
    >
        <TextInput
            FormContext={BankCreateFormStoreContext}
            path={"account"}
            placeholder={"Your name"}
            label={"Full name"}
            withAsterisk
        />
    </BankCreateBaseForm>;
};
