import {type IWithTranslator}                 from "@leight/i18n";
import {useTranslation as useCoolTranslation} from "next-i18next";

export const useTranslation = (namespace?: string[] | string): { t: IWithTranslator } => {
    return useCoolTranslation(namespace);
};
