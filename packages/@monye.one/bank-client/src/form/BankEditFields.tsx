import {withCondition} from "@leight/form";
import {DateTime}      from "@leight/i18n";
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
    const {defaultValues}               = BankEditFormStoreContext.useState(({defaultValues}) => ({defaultValues}));
    const [withBalance, setWithBalance] = useState(!!defaultValues?.balance);
    const form                          = BankEditMantineFormContext.useFormContext();
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
                        balance: defaultValues?.balance || {
                            date:  DateTime.now().toISODate() || "",
                            value: 0,
                        },
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
