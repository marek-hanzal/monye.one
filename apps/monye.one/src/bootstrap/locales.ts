export interface ILocale {
    dayjs: string;
}

export interface ILocales {
    [index: string]: ILocale;
}

export const locales = {
    en: {
        dayjs: "en",
    },
    "en-gb": {
        dayjs: "en-gb",
    },
    "en-us": {
        dayjs: "en",
    },
    cs: {
        dayjs: "cs",
    },
    sk: {
        dayjs: "sk",
    },
} satisfies ILocales;

export type IAvailableLocales = keyof typeof locales;

export const defaultLocale: ILocale = locales.en;
