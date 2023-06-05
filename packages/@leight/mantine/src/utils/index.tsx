"use client";

import {type IWithTranslation} from "@leight/i18n";
import {Translation}           from "@leight/i18n-client";
import {minMaxOf}              from "@leight/utils";
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

/**
 * Resolves native primary color from Mantine; because typings are a bit crazy,
 * this function just put them away.
 */
export const withPrimaryColor = (theme: MantineTheme, offset = 0): string => {
    return theme.colors[theme.primaryColor]?.[
        minMaxOf({
            value: theme.primaryShade as number + offset,
            max:   9
        })
        ] as string;
};

/**
 * Automatically makes "secondary" color of primary color visible; it can be used for
 * example for texts and so on.
 */
export const withSecondaryPrimaryColor = (theme: MantineTheme, offset = 0): string => {
    return theme.colors[theme.primaryColor]?.[
        minMaxOf({
            value: theme.primaryShade as number + offset,
            max:   9
        }) >= 5 ?
            0 :
            9
        ] as string;
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
