import {
    Form,
    type IFormProps,
    TextInput
}                                   from "@leight/form-client";
import {type FC}                    from "react";
import {type IBankCreateFormSchema} from "../sdk";

export interface IBankCreateForm extends IFormProps<IBankCreateFormSchema> {
}

export const BankCreateForm: FC<IBankCreateForm> = () => {
    return <Form<IBankCreateFormSchema>>
        <TextInput
            placeholder={"Your name"}
            label={"Full name"}
            withAsterisk
        />
    </Form>;
};
