import {type DateTimeFormatOptions, type IDateInput} from "@leight/i18n";
import {type FC, type HTMLProps} from "react";
import {DateTimeStore} from "../context";

export interface IDateInlineProps extends Omit<HTMLProps<HTMLSpanElement>, "children"> {
    date?: IDateInput;
    fallback?: IDateInput;
    options?: DateTimeFormatOptions;
}

export const DateInline: FC<IDateInlineProps> = ({date, fallback, options, ...props}) => {
    const {toLocalDate} = DateTimeStore.use(({toLocalDate}) => ({toLocalDate}));
    return <span {...props}>
        {toLocalDate(date, fallback, options)}
    </span>;
};
