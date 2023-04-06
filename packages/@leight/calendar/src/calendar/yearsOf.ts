import {
    DateTime,
    Interval
}                    from "@leight/i18n";
import {type IYears} from "../api";

export interface IYearsOfProps {
    /**
     * Input date - years of the year will be generated
     */
    date?: DateTime;
    columns?: number;
    rows?: number;
}

export const yearsOf = (
    {
        date = DateTime.now(),
        columns = 5,
        rows = 3,
    }: IYearsOfProps): IYears => {
    const margin   = ((columns - 1) / 2) + (((rows - 1) / 2) * columns);
    const start    = date.minus({year: margin});
    const end      = date.plus({year: margin});
    const interval = Interval.fromDateTimes(start, end);
    const length   = interval.count("years");
    const now      = DateTime.now();

    return {
        date,
        start,
        end,
        interval,
        columns,
        rows,
        count: columns * rows,
        now,
        get isCurrent() {
            return now.year >= start.year && now.year <= end.year;
        },
        get list() {
            return Array.from({length}, (_, year) => start.year + year);
        },
        get years() {
            return Array.from({length}, (_, year) => {
                const $year = start.plus({year});
                const id    = `${$year.year}`;
                return {
                    id,
                    name:      $year.year,
                    year:      $year,
                    isCurrent: now.year === $year.year,
                };
            });
        },
    };
};
