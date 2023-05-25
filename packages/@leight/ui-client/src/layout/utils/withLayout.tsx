import {type IPageWithLayout} from "@leight/ui";
import {type AppProps}        from "next/app";

export interface IWithLayoutProps {
    Component: AppProps["Component"];
    pageProps?: AppProps["pageProps"];
}

export const withLayout = (
    {
        Component,
        pageProps,
    }: IWithLayoutProps) => {
    return (
        (Component as unknown as IPageWithLayout).layout || ((page) => page)
    )(<Component {...pageProps}/>);
};
