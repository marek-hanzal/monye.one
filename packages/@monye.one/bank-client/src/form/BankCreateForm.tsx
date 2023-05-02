import {DateTime}                   from "@leight/i18n";
import {type FC}                    from "react";
import {IconBank}                   from "../icon";
import {
    BankCreateTrpcForm,
    type IBankCreateBaseFormProps
}                                   from "../sdk";
import {BankCreateFields}           from "./BankCreateFields";
import {BankCreateFormInputFactory} from "./BankCreateFormInputFactory";

export interface IBankCreateForm extends Omit<IBankCreateBaseFormProps, "toRequest" | "inputs"> {
}

export const BankCreateForm: FC<IBankCreateForm> = props => {
    return <BankCreateTrpcForm
        toRequest={({values: toCreate}) => ({toCreate})}
        inputs={BankCreateFormInputFactory}
        defaultValues={{
            account: "",
            balance: {
                value: 0,
                date:  DateTime.now().toISODate() || "",
            },
        }}
        submitProps={{
            leftIcon: <IconBank/>,
        }}
        {...props}
    >
        <BankCreateFields/>
    </BankCreateTrpcForm>;
};
