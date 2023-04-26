import {type IWithTranslation} from "@leight/i18n";
import {isString}              from "@leight/utils";
import {
    type FC,
    type ReactNode
}                              from "react";
import {useTranslation}        from "./hook";

export interface ITranslationProps extends Omit<IWithTranslation, "label"> {
    label?: ReactNode;
    withLabel?: ReactNode;
    withLabelFallback?: string;
}

export const Translation: FC<ITranslationProps> = (
    {
        label,
        withLabel,
        namespace,
        withLabelFallback,
        values,
    }) => {
    const {t} = useTranslation(namespace);
    return <>
        {label ? (
            isString(label) ? (
                withLabelFallback ? (isString(withLabel) ? t(
                    withLabel ? `${label}.${withLabel}` : label, withLabelFallback, values
                ) : withLabel) : t(withLabel ? `${label}.${withLabel}` : label, values)
            ) : label
        ) : (isString(withLabel) ? t(withLabel) : withLabel)}
    </>;
};
