import {type IWithTranslation} from "@leight/i18n";
import {Translation}           from "@leight/i18n-client";
import {
    Drawer as CoolDrawer,
    Group
}                              from "@mantine/core";
import {
    type ComponentProps,
    type FC,
    ReactNode
}                              from "react";
import {DrawerStore}           from "../context";
import {WithIcon}              from "./WithIcon";

export interface IDrawerProps extends Omit<ComponentProps<typeof CoolDrawer>, "opened" | "onClose"> {
    icon?: ReactNode;
    withTranslation?: IWithTranslation;
}

export const Drawer: FC<IDrawerProps> = (
    {
        icon,
        withTranslation,
        title,
        ...props
    }) => {
    const {isOpened, close} = DrawerStore.useState(({isOpened, close}) => ({isOpened, close}));
    return <CoolDrawer
        opened={isOpened}
        onClose={close}
        position={"right"}
        title={<Group spacing={4}>
            <WithIcon icon={icon}/>
            <Translation {...withTranslation} label={title}/>
        </Group>}
        size={"lg"}
        zIndex={500}
        {...props}
    />;
};
