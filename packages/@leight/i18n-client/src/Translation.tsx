import {IWithTranslation} from "@leight/i18n";
import {isString}         from "@leight/utils";
import {
    type FC,
    type ReactNode
}                         from "react";
import {useTranslation}   from "./hook";

export interface ITranslationProps extends Omit<IWithTranslation, "label"> {
    label?: ReactNode;
    withLabelFallback?: string;
}

export const Translation: FC<ITranslationProps> = (
    {
        label,
        namespace,
        withLabelFallback,
        values,
    }) => {
    const {t} = useTranslation(namespace);
    return label ? (
        <>{isString(label) ? (withLabelFallback ? t(label, withLabelFallback, values) : t(label, values)) : label}</>
    ) : null;
};
