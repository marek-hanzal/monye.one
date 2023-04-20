import {type IWithTranslation} from "@leight/i18n";
import {Translation}           from "@leight/i18n-client";
import {type MantineTheme}     from "@mantine/core";
import {
    NotificationProps,
    notifications
}                              from "@mantine/notifications";
import {
    IconCheck,
    IconCross
}                              from "@tabler/icons-react";

export const switchScheme = <T, >(
    theme: MantineTheme,
    onDark: T,
    onLight: T
): T => (theme.colorScheme === "dark" ? onDark : onLight);

export const withPrimaryColor = (theme: MantineTheme): string => {
    return theme.colors[theme.primaryColor]?.[theme.primaryShade as number] as string;
};

export interface IWithSuccessNotificationProps extends Omit<NotificationProps, "title" | "message" | "color"> {
    withTranslation: IWithTranslation;
}

export const withSuccessNotification = (
    {
        withTranslation,
        ...props
    }: IWithSuccessNotificationProps) => {
    notifications.show({
        title:   <Translation {...withTranslation} label={`${withTranslation.label}.success.title`}/>,
        message: <Translation {...withTranslation} label={`${withTranslation.label}.success.message`}/>,
        icon:    <IconCheck size={"1.1rem"}/>,
        color:   "teal",
        ...props,
    });
};

export const withErrorNotification = (
    {
        withTranslation,
        ...props
    }: IWithSuccessNotificationProps) => {
    notifications.show({
        title:   <Translation {...withTranslation} label={`${withTranslation.label}.error.title`}/>,
        message: <Translation {...withTranslation} label={`${withTranslation.label}.error.message`}/>,
        icon:    <IconCross size={"1.1rem"}/>,
        color:   "red",
        ...props,
    });
};
