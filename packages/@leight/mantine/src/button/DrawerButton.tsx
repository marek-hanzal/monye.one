import {type IWithTranslation} from "@leight/i18n";
import {Translation}           from "@leight/i18n-client";
import {Button}                from "@mantine/core";
import {
    type ComponentProps,
    type FC,
    type ReactNode
}                              from "react";
import {DrawerStore}           from "../context";

export interface IDrawerButtonProps extends Omit<ComponentProps<typeof Button<"button">>, "children"> {
    drawerId: string;
    withTranslation?: IWithTranslation;
    label?: ReactNode;
}

export const DrawerButton: FC<IDrawerButtonProps> = ({drawerId, withTranslation, label, ...props}) => {
    const {open} = DrawerStore.useState(({open}) => ({open}));
    return <Button
        {...props}
        onClick={() => open(drawerId)}
    >
        <Translation {...withTranslation} label={"drawer"} withLabel={label}/>
    </Button>;
};
