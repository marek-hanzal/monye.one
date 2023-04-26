import {type IWithTranslation} from "@leight/i18n";
import {Translation}           from "@leight/i18n-client";
import {BlockProvider}         from "@leight/utils-client";
import {
    Drawer as CoolDrawer,
    Group
}                              from "@mantine/core";
import {
    type ComponentProps,
    type FC,
    type ReactNode
}                              from "react";
import {DrawerStore}           from "../context";
import {WithIcon}              from "./WithIcon";

export interface IDrawerProps extends Omit<ComponentProps<typeof CoolDrawer>, "opened" | "onClose"> {
    drawerId: string;
    icon?: ReactNode;
    withTranslation?: IWithTranslation;
}

export const Drawer: FC<IDrawerProps> = (
    {
        drawerId,
        icon,
        withTranslation,
        title,
        children,
        ...props
    }) => {
    const {isOpened, close} = DrawerStore.useState(({isOpened, close}) => ({isOpened, close}));
    return <CoolDrawer
        opened={isOpened[drawerId] || false}
        onClose={() => close(drawerId)}
        position={"right"}
        title={<Group spacing={4}>
            <WithIcon icon={icon}/>
            <Translation {...withTranslation} withLabel={title}/>
        </Group>}
        size={"lg"}
        zIndex={500}
        {...props}
    >
        <BlockProvider>
            {children}
        </BlockProvider>
    </CoolDrawer>;
};
