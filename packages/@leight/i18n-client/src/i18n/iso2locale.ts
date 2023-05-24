import {
    DateTime,
    type DateTimeFormatOptions,
    type IDateInput,
    isDateTime
}                 from "@leight/i18n";
import {isString} from "@leight/utils";

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
