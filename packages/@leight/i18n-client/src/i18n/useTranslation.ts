import {
    isTranslation,
    type IWithTranslation
}                        from "@leight/i18n";
import {isString}        from "@leight/utils";
import {useTranslations} from "next-intl";

export const useTranslation = (input?: string | IWithTranslation) => {
    return useTranslations(isString(input) ? input : isTranslation(input) ? input.namespace : undefined);
};
