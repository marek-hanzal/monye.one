import {bootstrap}          from "@/monye.one/bootstrap/bootstrap";
import {emotionCache}       from "@/monye.one/emotion-cache";
import "@/monye.one/styles/globals.css";
import {App}                from "@leight/mantine";
import type {ColorScheme}   from "@mantine/core";
import {trpc}               from "@monye.one/trpc-client";
import i18next              from "i18next";
import {appWithTranslation} from "next-i18next";
import type {AppProps}      from "next/app";
import {useRouter}          from "next/router";
import {useEffect}          from "react";

export function MonyeOne(
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

    return <App
        title={"monye.one"}
        i18next={i18next}
        emotionCache={emotionCache}
        Component={Component}
        pageProps={pageProps}
    />;
}

export default trpc.withTRPC(appWithTranslation(MonyeOne));
