import {DateTimeProvider} from "@leight/i18n-client";
import {MantineProvider}  from "@mantine/core";
import {Notifications}    from "@mantine/notifications";
import {
    type ComponentProps,
    type FC,
    type PropsWithChildren
}                         from "react";

type MantineProviderProps = ComponentProps<typeof MantineProvider>;

export type IShellProps = PropsWithChildren<{
    theme?: MantineProviderProps["theme"];
    emotionCache?: MantineProviderProps["emotionCache"];
}>

export const Shell: FC<IShellProps> = ({theme, emotionCache, children}) => {
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
        <DateTimeProvider>
            <Notifications position={"top-right"}/>
            {children}
        </DateTimeProvider>
    </MantineProvider>;
};
