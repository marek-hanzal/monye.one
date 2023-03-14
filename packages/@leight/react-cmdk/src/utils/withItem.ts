import {IWithTranslator}   from "@leight/i18n";
import {isString}          from "@leight/utils";
import {JsonStructureItem} from "../types";

export interface IWithItemProps extends JsonStructureItem {
    t: IWithTranslator;
}

export const withItem = ({t, children, itemType, keywords, ...props}: IWithItemProps) => {
    return {
        children: isString(children) ? t(children) : children,
        itemType: isString(itemType) ? t(itemType) : itemType,
        keywords: keywords?.filter(isString).map(keyword => t(keyword)),
        ...props,
    };
};
