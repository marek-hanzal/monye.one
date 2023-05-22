import {NextIntlClientProvider} from "next-intl";
import {type PropsWithChildren} from "react";

export type ILayoutShellProps = PropsWithChildren<{
    /**
     * Set current locale
     */
    locale: string;
    /**
     * Translations used in the application
     */
    translations: Record<string, any>;
}>;

export const LayoutShell = (
    {
        locale,
        translations,
        children
    }: ILayoutShellProps) => {
    return <NextIntlClientProvider
        locale={locale}
        messages={translations}
    >
        {children}
    </NextIntlClientProvider>;
};
