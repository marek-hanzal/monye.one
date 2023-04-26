import {type IWithTranslation} from "@leight/i18n";
import {Translation}           from "@leight/i18n-client";
import {isString}              from "@leight/utils";
import {
    Group,
    Modal as CoolModal
}                              from "@mantine/core";
import {
    type ComponentProps,
    type FC,
    type ReactNode
}                              from "react";
import {ModalStore}            from "../context";
import {WithIcon}              from "./WithIcon";

export interface IModalProps extends Omit<ComponentProps<typeof CoolModal>, "opened" | "onClose"> {
    icon?: ReactNode;
    withTranslation?: IWithTranslation;
}

export const Modal: FC<IModalProps> = (
    {
        icon,
        withTranslation,
        title,
        ...props
    }) => {
    const {isOpened, close} = ModalStore.useState(({isOpened, close}) => ({isOpened, close}));
    return <CoolModal
        opened={isOpened}
        onClose={close}
        title={<Group spacing={4}>
            <WithIcon icon={icon}/>
            {isString(title) ? <Translation {...withTranslation} withLabel={title}/> : title}
        </Group>}
        size={"lg"}
        zIndex={500}
        {...props}
    />;
};
