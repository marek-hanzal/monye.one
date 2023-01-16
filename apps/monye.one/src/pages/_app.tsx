import {bootstrap}             from "@/monye.one/bootstrap/bootstrap";
import {emotionCache}          from "@/monye.one/emotion-cache";
import "@/monye.one/styles/globals.css";
import type {IPageWithLayout}  from "@leight/layout";
import {RouterTransition}      from "@leight/mantine";
import type {ColorScheme}      from "@mantine/core";
import {
    ColorSchemeProvider,
    MantineProvider
}                              from "@mantine/core";
import {NotificationsProvider} from "@mantine/notifications";
import {trpc}                  from "@monye.one/trpc-client";
import {
    getCookie,
    setCookies
}                              from "cookies-next";
import {SessionProvider}       from "next-auth/react";
import {appWithTranslation}    from "next-i18next";
import type {
    AppContext,
    AppProps
}                              from "next/app";
import Head                    from "next/head";
import {useRouter}             from "next/router";
import {
    useEffect,
    useState
}                              from "react";

export function PuffSmith({Component, pageProps, colorScheme}: AppProps & { colorScheme: ColorScheme }) {
    const router = useRouter();
    useEffect(() => {
        (async () => {
            await bootstrap(router.locale || router.defaultLocale || "en");
        })();
    }, [
        router.locale,
        router.defaultLocale,
    ]);
    const [$colorScheme, $setColorScheme] = useState<ColorScheme>(colorScheme);

    const toggleColorScheme = (value?: ColorScheme) => {
        const nextColorScheme = value || ($colorScheme === "dark" ? "light" : "dark");
        $setColorScheme(nextColorScheme);
        setCookies("mantine-color-scheme", nextColorScheme, {maxAge: 60 * 60 * 24 * 30});
    };

    return <>
        <Head>
            <title>monye.one</title>
            <meta name={"viewport"} content={"minimum-scale=1, initial-scale=1, width=device-width"}/>
            <link rel={"shortcut icon"} href={"/favicon.ico"}/>
        </Head>
        <ColorSchemeProvider
            colorScheme={$colorScheme}
            toggleColorScheme={toggleColorScheme}
        >
            <MantineProvider
                theme={{colorScheme: $colorScheme}}
                withGlobalStyles
                withNormalizeCSS
                emotionCache={emotionCache}
            >
                <RouterTransition/>
                <NotificationsProvider>
                    <SessionProvider
                        refetchInterval={30}
                        refetchOnWindowFocus
                    >
                        {((Component as unknown as IPageWithLayout).layout || (page => page))(<Component {...pageProps}/>)}
                    </SessionProvider>
                </NotificationsProvider>
            </MantineProvider>
        </ColorSchemeProvider>
    </>;
}

PuffSmith.getInitialProps = ({ctx}: AppContext) => ({
    $colorScheme: getCookie("mantine-color-scheme", ctx) || "light",
});

export default trpc.withTRPC(appWithTranslation(PuffSmith));
