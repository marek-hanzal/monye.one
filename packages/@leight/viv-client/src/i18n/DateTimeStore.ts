import {
    type IDateInput,
    type IDateTimeStoreProps,
    isDateTime,
    isString
}                           from "@leight/viv";
import {
    DateTime,
    type DateTimeFormatOptions
}                           from "luxon";
import {createStoreContext} from "../store";

export const iso2locale = (date?: IDateInput, fallback?: IDateInput, opts?: DateTimeFormatOptions): string | undefined => {
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
