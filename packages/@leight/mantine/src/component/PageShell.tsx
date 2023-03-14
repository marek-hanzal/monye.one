import {type IPageWithLayout} from "@leight/layout";
import {MantineProvider}      from "@mantine/core";
import {Notifications}        from "@mantine/notifications";
import {SessionProvider}      from "next-auth/react";
import {type AppProps}        from "next/app";
import Head                   from "next/head";
import {
    type ComponentProps,
    type FC
}                             from "react";
import {RouterTransition}     from "../RouterTransition";

export interface IPageShellProps {
    /**
     * Default page title
     */
    title: string;
    colorScheme?: "dark" | "light";
    /**
     * Incoming component name from Next.js _app
     */
    Component: AppProps["Component"];
    /**
     * Incoming component page props from Next.js _app
     */
    pageProps?: AppProps["pageProps"];
    emotionCache?: ComponentProps<typeof MantineProvider>["emotionCache"];
}

/**
 * This is a wrapper for the _app as it contains basic setup (mantine stuff, ...) for the application.
 */
export const PageShell: FC<IPageShellProps> = (
    {
        title,
        colorScheme = "light",
        emotionCache,
        Component,
        pageProps,
    }) => {
    return <>
        <Head>
            <title>{title}</title>
            <meta
                name={"viewport"}
                content={
                    "minimum-scale=1, initial-scale=1, width=device-width"
                }
            />
            <link rel={"shortcut icon"} href={"/favicon.ico"}/>
        </Head>
        <MantineProvider
            theme={{colorScheme}}
            withGlobalStyles
            withNormalizeCSS
            emotionCache={emotionCache}
        >
            <Notifications/>
            <RouterTransition/>
            <SessionProvider
                refetchInterval={30}
                refetchOnWindowFocus
            >
                {(
                    (Component as unknown as IPageWithLayout)
                        .layout || ((page) => page)
                )(<Component {...pageProps}/>)}
            </SessionProvider>
        </MantineProvider>
    </>;
};
