import {withCondition} from "@leight/form-client";
import {Translation}   from "@leight/i18n-client";
import {
    Box,
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
    const {defaultValues}               = BankCreateFormStoreContext.useState(({defaultValues}) => ({defaultValues}));
    return <>
        <BankCreateInput path={"account"}/>
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
        <Box
            hidden={!withBalance}
        >
            <BankCreateInput path={"balance.value"}/>
            <BankCreateInput path={"balance.date"}/>
        </Box>
    </>;
};
