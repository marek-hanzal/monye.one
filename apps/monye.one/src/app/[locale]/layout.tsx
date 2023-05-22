"use client";

import {LayoutShell}            from "@leight/viv-client";
import {MantineProvider}        from "@mantine/core";
import {notFound}               from "next/navigation";
import {type PropsWithChildren} from "react";

// export function generateStaticParams() {
//     return locales.map(locale => ({locale}));
// }

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
    try {
        const translations = (await import(`../../translation/${locale}.json`)).default;
        return <MantineProvider
            withGlobalStyles
            withNormalizeCSS
        >
            <html
                lang={locale}
            >
                <body>
                    <LayoutShell
                        locale={locale}
                        translations={translations}
                    >
                        {children}
                    </LayoutShell>
                </body>
            </html>
        </MantineProvider>;
    } catch (e) {
        notFound();
    }
}
