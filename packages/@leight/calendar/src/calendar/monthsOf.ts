import {
    DateTime,
    Info,
    Interval,
    type StringUnitLength
}                     from "@leight/i18n";
import {type IMonths} from "../api";

export interface IMonthsOfProps {
    /**
     * Input date - months of the year will be generated
     */
    date?: DateTime;
    monthFormat?: StringUnitLength;
}

export const monthsOf = (
    {
        date = DateTime.now(),
        monthFormat = "long",
    }: IMonthsOfProps): IMonths => {
    const start    = date.startOf("year");
    const end      = date.endOf("year");
    const interval = Interval.fromDateTimes(start, end);
    const length   = interval.count("months");
    const now      = DateTime.now();

    return {
        date,
        start,
        end,
        interval,
        now,
        get isCurrent() {
            return interval.contains(now);
        },
        get list() {
            return Info.months(monthFormat);
        },
        get months() {
            return Array.from({length}, (_, month) => {
                const $month = start.plus({month});
                const id     = `${$month.year}-${$month.month}`;
                return {
                    id,
                    name:      $month.toLocaleString({month: "long"}),
                    month:     $month,
                    number:    $month.month,
                    isCurrent: now.year === $month.year && now.month === $month.month,
                };
            });
        },
    };
};
