"use client";

import {CacheProvider}          from "@emotion/react";
import {MantineProvider}        from "@mantine/core";
import {ModalsProvider}         from "@mantine/modals";
import {Notifications}          from "@mantine/notifications";
import {NextIntlClientProvider} from "next-intl";
import {useServerInsertedHTML}  from "next/navigation";
import {
    type ComponentProps,
    type PropsWithChildren
}                               from "react";
import {withEmotionCache}       from "../emotion";

type MantineProviderProps = ComponentProps<typeof MantineProvider>;

export type ILayoutShellProps = PropsWithChildren<{
    theme?: MantineProviderProps["theme"];
    emotionCache?: MantineProviderProps["emotionCache"];
    /**
     * Set current locale
     */
    locale: string;
    /**
     * Translations used in the application
     */
    translations: Record<string, any>;
}>;

export const LayoutShell = (
    {
        theme,
        emotionCache = withEmotionCache(),
        locale,
        translations,
        children
    }: ILayoutShellProps) => {
    useServerInsertedHTML(() => (
        <style
            data-emotion={`${emotionCache.key} ${Object.keys(emotionCache.inserted).join(" ")}`}
            dangerouslySetInnerHTML={{
                __html: Object.values(emotionCache.inserted).join(" "),
            }}
        />
    ));

    return <NextIntlClientProvider
        locale={locale}
        messages={translations}
    >
        <CacheProvider
            value={emotionCache}
        >
            <MantineProvider
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
                <Notifications position={"top-right"}/>
                <ModalsProvider>
                    {children}
                </ModalsProvider>
            </MantineProvider>
        </CacheProvider>
    </NextIntlClientProvider>;
};
