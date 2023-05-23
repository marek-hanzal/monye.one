import {type DateTimeFormatOptions} from "luxon";
import {type IStoreProps}           from "../store";
import {type IDateInput}            from "./IDateInput";

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
}, {
    locale: string;
}>
