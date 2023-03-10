import {IWithTranslation} from "@leight/i18n";
import {isString}         from "@leight/utils";
import {useTranslation}   from "next-i18next";
import {
    type FC,
    type ReactNode
}                         from "react";

export interface ITranslationProps extends Omit<IWithTranslation, "label"> {
    label: ReactNode;
}

export const Translation: FC<ITranslationProps> = ({label, namespace, values}) => {
    const {t} = useTranslation(namespace);
    return <>{isString(label) ? t(label as string, values as any) : label}</>;
};
