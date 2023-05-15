import {NextIntlClientProvider} from "next-intl";
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
        return <html
            lang={locale}
        >
            <body>
                <NextIntlClientProvider
                    locale={locale}
                    messages={translations}
                >
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>;
    } catch (e) {
        notFound();
    }
}
