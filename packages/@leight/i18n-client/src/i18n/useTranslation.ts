import {useTranslations} from "next-intl";

export const useTranslation = (namespace?: string) => useTranslations(namespace);
