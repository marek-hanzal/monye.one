/**
 * Documentation
 * @see jetbrains://idea/navigate/reference?project=@leight/viv&path=nextra/pages/docs/workbench/i18n.mdx
 */

import {createStoreContext} from "@leight/context-client";
import {
    DateTime,
    type DateTimeFormatOptions,
    type IDateInput,
    isDateTime
}                           from "@leight/i18n";
import {isString}           from "@leight/utils";
import {type IStoreProps}   from "@leight/zustand";
import {
    type ComponentProps,
    type FC
}                           from "react";

/**
 * Store shape for date time context.
 */
export type IDateTimeStoreProps = IStoreProps<{
    /**
     * Take input string in ISO format and reformat it into the user's locale.
     */
    toLocalDate(date?: IDateInput, fallback?: IDateInput, opts?: DateTimeFormatOptions): string | undefined;
    /**
     * Take input string in ISO format and return localized date & time
     */
    toLocalDateTime(date?: IDateInput, fallback?: IDateInput, opts?: DateTimeFormatOptions): string | undefined;
}>

const iso2locale = (date?: IDateInput, fallback?: IDateInput, opts?: DateTimeFormatOptions): string | undefined => {
    if (!date) {
        date = fallback;
    }
    if (!date) {
        return undefined;
    }
    if (isString(date)) {
        return DateTime.fromISO(date).toLocaleString(opts);
    } else if (isDateTime(date)) {
        return date.toLocaleString(opts);
    }
    return DateTime.fromJSDate(date).toLocaleString(opts);
};

export const DateTimeStore = createStoreContext<IDateTimeStoreProps>({
    state: () => () => ({
        toLocalDate(date, fallback, opts = DateTime.DATE_MED) {
            return iso2locale(date, fallback, opts);
        },
        toLocalDateTime(date, fallback, opts = DateTime.DATETIME_MED) {
            return iso2locale(date, fallback, opts);
        },
    }),
    name:  "DateTimeStore",
    hint:  "Add DateTimeStore.Provider.",
});

export interface IDateTimeProviderProps extends Omit<ComponentProps<typeof DateTimeStore["Provider"]>, "state"> {
}

export const DateTimeProvider: FC<IDateTimeProviderProps> = ({...props}) => {
    return <DateTimeStore.Provider
        {...props}
    />;
};
