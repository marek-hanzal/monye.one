import {withCondition} from "@leight/form";
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
    BankCreateFormStoreContext,
    BankCreateInput,
    BankCreateMantineFormContext
}                      from "../sdk";

export interface IBankCreateFieldsProps {
}

export const BankCreateFields: FC<IBankCreateFieldsProps> = () => {
    const [withBalance, setWithBalance] = useState(true);
    const form                          = BankCreateMantineFormContext.useFormContext();
    const {defaultValues}               = BankCreateFormStoreContext.use(({defaultValues}) => ({defaultValues}));
    return <>
        <BankCreateInput path={"account"}/>
        <BankCreateInput path={"description"}/>
        <Divider mt={"md"}/>
        <Switch
            size={"md"}
            mt={"md"}
            label={<Translation namespace={"bank"} label={"BankCreateForm.withBalance.switch.label"}/>}
            description={<Translation namespace={"bank"} label={"BankCreateForm.withBalance.switch.description"}/>}
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
            <BankCreateInput path={"balance.date"}/>
            <BankCreateInput path={"balance.value"}/>
        </Card>}
    </>;
};
