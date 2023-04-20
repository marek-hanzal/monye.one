import {withCondition} from "@leight/form-client";
import {Translation}   from "@leight/i18n-client";
import {
    Card,
    Divider,
    Switch
}                      from "@mantine/core";
import {
    type FC,
    useState
}                      from "react";
import {
    BankEditFormStoreContext,
    BankEditInput,
    BankEditMantineFormContext
}                      from "../sdk";

export interface IBankEditFieldsProps {
}

export const BankEditFields: FC<IBankEditFieldsProps> = () => {
    const [withBalance, setWithBalance] = useState(true);
    const form                          = BankEditMantineFormContext.useFormContext();
    const {defaultValues}               = BankEditFormStoreContext.useState(({defaultValues}) => ({defaultValues}));
    return <>
        <BankEditInput path={"account"}/>
        <BankEditInput path={"description"}/>
        <Divider mt={"md"}/>
        <Switch
            size={"md"}
            mt={"md"}
            label={<Translation namespace={"bank"} label={"BankEditForm.withBalance.switch.label"}/>}
            description={<Translation namespace={"bank"} label={"BankEditForm.withBalance.switch.description"}/>}
            checked={withBalance}
            onChange={event => {
                withCondition({
                    form,
                    bool:      event.currentTarget.checked,
                    whenTrue:  {
                        balance: defaultValues?.balance,
                    },
                    whenFalse: {
                        balance: undefined,
                    },
                    callback:  () => setWithBalance(event.currentTarget.checked),
                });
            }}
        />
        {withBalance && <Card
            withBorder
            mt={"md"}
        >
            <BankEditInput path={"balance.date"}/>
            <BankEditInput path={"balance.value"}/>
        </Card>}
    </>;
};
