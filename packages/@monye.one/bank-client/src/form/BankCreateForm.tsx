import {
    Form,
    type IFormProps,
    TextInput
}                from "@leight/form-client";
import {type FC} from "react";

export interface IBankCreateForm extends IFormProps {
}

export const BankCreateForm: FC<IBankCreateForm> = () => {
    return <Form>
        <TextInput
            placeholder={"Your name"}
            label={"Full name"}
            withAsterisk
        />
    </Form>;
};
