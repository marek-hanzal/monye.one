import {emotionCache}       from "@/monye.one/emotion-cache";
import "@/monye.one/styles/globals.css";
import {PageShell}          from "@leight/mantine";
import type {ColorScheme}   from "@mantine/core";
import {trpc}               from "@monye.one/trpc-client";
import {appWithTranslation} from "next-i18next";
import type {AppProps}      from "next/app";

export function MonyeOne(
    {
        Component,
        pageProps,
    }: AppProps & { colorScheme: ColorScheme }) {
    return <PageShell
        title={"monye.one"}
        emotionCache={emotionCache}
        Component={Component}
        pageProps={pageProps}
    />;
}

export default trpc.withTRPC(appWithTranslation(MonyeOne));
