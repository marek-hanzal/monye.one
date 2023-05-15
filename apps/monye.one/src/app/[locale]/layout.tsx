import {locales}                from "@/monye.one/locales";
import {LocaleProvider}         from "@leight/viv-client";
import {type PropsWithChildren} from "react";

export function generateStaticParams() {
    return locales.map(locale => ({locale}));
}

export type ILayoutProps = PropsWithChildren<{
    params: {
        locale: string;
    },
}>;

export default async function Layout(
    {
        children,
        params: {locale}
    }: ILayoutProps) {
    // try {
    // const translations = (await import(`../translation/${locale}.json`)).default;
    const translations = {};
    return <html
        lang={locale}
    >
        <body>
            <LocaleProvider
                locale={locale}
                messages={translations}
            >
                {children}
            </LocaleProvider>
        </body>
    </html>;
    // } catch (e) {
    //     notFound();
    // }
}
