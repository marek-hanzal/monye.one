import {type IWithTranslator}                 from "@leight/i18n";
import {useTranslation as useCoolTranslation} from "next-i18next";

export const useTranslation = (namespace?: (string | undefined)[] | string): { t: IWithTranslator } => {
    return useCoolTranslation(Array.isArray(namespace) ? namespace.filter(Boolean) : namespace);
};
