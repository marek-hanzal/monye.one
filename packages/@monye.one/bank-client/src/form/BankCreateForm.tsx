import {TextInput} from "@leight/form-client";
import {type FC}   from "react";
import {
    BankCreateBaseForm,
    type IBankCreateBaseFormProps
}                  from "../sdk";

export interface IBankCreateForm extends IBankCreateBaseFormProps {
}

export const BankCreateForm: FC<IBankCreateForm> = props => {
    return <BankCreateBaseForm
        {...props}
    >
        <TextInput
            placeholder={"Your name"}
            label={"Full name"}
            withAsterisk
        />
    </BankCreateBaseForm>;
};
