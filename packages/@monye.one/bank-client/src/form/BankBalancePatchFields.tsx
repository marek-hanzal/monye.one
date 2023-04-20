import {type FC}        from "react";
import {BankPatchInput} from "../sdk";

export interface IBankBalancePatchFieldsProps {
}

export const BankBalancePatchFields: FC<IBankBalancePatchFieldsProps> = () => {
    return <>
        <BankPatchInput path={"balance.date"}/>
        <BankPatchInput path={"balance.value"}/>
    </>;
};
