import {
    type IDateInput,
    isDateTime,
    isString
} from "@leight/viv";
import {
    DateTime,
    type DateTimeFormatOptions
} from "luxon";

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
