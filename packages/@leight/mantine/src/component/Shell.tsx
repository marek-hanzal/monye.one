import {DateTimeProvider} from "@leight/i18n-client";
import {MantineProvider}  from "@mantine/core";
import {ModalsProvider}   from "@mantine/modals";
import {Notifications}    from "@mantine/notifications";
import {
    type ComponentProps,
    type FC,
    type PropsWithChildren
}                         from "react";

type MantineProviderProps = ComponentProps<typeof MantineProvider>;

export type IShellProps = PropsWithChildren<{
    locale: string;
    theme?: MantineProviderProps["theme"];
    emotionCache?: MantineProviderProps["emotionCache"];
}>

export const Shell: FC<IShellProps> = (
    {
        locale,
        theme,
        emotionCache,
        children
    }) => {
    return <MantineProvider
        theme={{
            colorScheme:  "light",
            primaryColor: "green",
            primaryShade: 8,
            ...theme
        }}
        withGlobalStyles
        withNormalizeCSS
        emotionCache={emotionCache}
    >
        <ModalsProvider>
            <DateTimeProvider
                locale={locale}
            >
                <Notifications position={"top-right"}/>
                {children}
            </DateTimeProvider>
        </ModalsProvider>
    </MantineProvider>;
};
