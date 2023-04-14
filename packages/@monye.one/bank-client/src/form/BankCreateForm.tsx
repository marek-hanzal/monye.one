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
            label={"account"}
            placeholder={"account.placeholder"}
            withAsterisk
        />
    </BankCreateBaseForm>;
};
