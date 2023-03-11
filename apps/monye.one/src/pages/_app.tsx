import {bootstrap}            from "@/monye.one/bootstrap/bootstrap";
import {emotionCache}         from "@/monye.one/emotion-cache";
import "@/monye.one/styles/globals.css";
import type {IPageWithLayout} from "@leight/layout";
import {RouterTransition}     from "@leight/mantine";
import type {ColorScheme}     from "@mantine/core";
import {MantineProvider}      from "@mantine/core";
import {Notifications}        from "@mantine/notifications";
import {trpc}                 from "@monye.one/trpc-client";
import {SessionProvider}      from "next-auth/react";
import {appWithTranslation}   from "next-i18next";
import type {AppProps}        from "next/app";
import Head                   from "next/head";
import {useRouter}            from "next/router";
import {useEffect}            from "react";

export function PuffSmith(
    {
        Component,
        pageProps,
    }: AppProps & { colorScheme: ColorScheme }) {
    const router = useRouter();
    useEffect(() => {
        (async () => {
            await bootstrap(router.locale || router.defaultLocale || "en");
        })();
    }, [
        router.locale,
        router.defaultLocale
    ]);

    return (
        <>
            <Head>
                <title>monye.one</title>
                <meta
                    name={"viewport"}
                    content={
                        "minimum-scale=1, initial-scale=1, width=device-width"
                    }
                />
                <link rel={"shortcut icon"} href={"/favicon.ico"}/>
            </Head>
            <MantineProvider
                theme={{colorScheme: "light"}}
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
                    )(<Component {...pageProps} />)}
                </SessionProvider>
            </MantineProvider>
        </>
    );
}

export default trpc.withTRPC(appWithTranslation(PuffSmith));
