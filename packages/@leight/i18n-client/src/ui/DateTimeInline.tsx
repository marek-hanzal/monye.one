import {type DateTimeFormatOptions, type IDateInput} from "@leight/i18n";
import {type FC} from "react";
import {DateTimeStore} from "../context";

export interface IDateTimeInlineProps {
    date?: IDateInput;
    fallback?: IDateInput;
    options?: DateTimeFormatOptions;
}

export const DateTimeInline: FC<IDateTimeInlineProps> = ({date, fallback, options}) => {
    const {toLocalDateTime} = DateTimeStore.use(({toLocalDateTime}) => ({toLocalDateTime}));
    return <>
        {toLocalDateTime(date, fallback, options)}
    </>;
};
