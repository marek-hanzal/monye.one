import {dayjs} from "@/monye.one/bootstrap/dayjs";
import {
    defaultLocale,
    type IAvailableLocales,
    locales
}              from "@/monye.one/bootstrap/locales";

export const bootstrap = async (locale: string) => {
    const $locale = locales[locale as IAvailableLocales] || defaultLocale;
    return {
        dayjs: await dayjs($locale.dayjs),
    };
};
