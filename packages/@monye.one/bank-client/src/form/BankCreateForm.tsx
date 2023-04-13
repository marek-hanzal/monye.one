import {
    Form,
    type IFormProps
}                from "@leight/form-client";
import {type FC} from "react";

export interface IBankCreateForm extends IFormProps {
}

export const BankCreateForm: FC<IBankCreateForm> = () => {
    return <Form>
    </Form>;
};
