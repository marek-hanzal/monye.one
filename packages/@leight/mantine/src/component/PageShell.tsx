import {type IPageWithLayout} from "@leight/layout";
import {SessionProvider}      from "next-auth/react";
import {type AppProps}        from "next/app";
import Head                   from "next/head";
import {type FC}              from "react";
import {RouterTransition}     from "../RouterTransition";
import {
    type IShellProps,
    Shell
}                             from "./Shell";

export interface IPageShellProps extends IShellProps {
    /**
     * Default page title
     */
    title: string;
    /**
     * Incoming component name from Next.js _app
     */
    Component: AppProps["Component"];
    /**
     * Incoming component page props from Next.js _app
     */
    pageProps?: AppProps["pageProps"];
    isLoading?: boolean;
}

/**
 * This is a wrapper for the _app as it contains basic setup (mantine stuff, ...) for the application.
 */
export const PageShell: FC<IPageShellProps> = (
    {
        title,
        Component,
        pageProps,
        ...props
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
        <RouterTransition/>
        <SessionProvider
            refetchInterval={30}
            refetchOnWindowFocus
        >
            <Shell
                {...props}
            >
                {(
                    (Component as unknown as IPageWithLayout).layout || ((page) => page)
                )(<Component {...pageProps}/>)}
            </Shell>
        </SessionProvider>
    </>;
};
