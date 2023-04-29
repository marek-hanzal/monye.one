import {DateTime} from "luxon";

export type IRangeOfList =
    "none"
    | "last-week"
    | "last-month"
    | "last-year"
    | "current-week"
    | "current-month"
    | "current-year";

export interface IRangeOfProps {
    range?: string;
}

export const RangeOfList: IRangeOfList[] = [
    "none",
    "last-week",
    "last-month",
    "last-year",
    "current-week",
    "current-month",
    "current-year",
];

export interface IRangeOf {
    from: DateTime;
    to: DateTime;
}

export const rangeOf = (
    {
        range,
    }: IRangeOfProps): IRangeOf | undefined => {
    const now = DateTime.now();
    switch (range) {
        case "last-week": {
            const date = now.startOf("week");
            const from = date.minus({week: 1});
            return {
                from,
                to: from.endOf("week"),
            };
        }
        case "last-month": {
            const date = now.startOf("month");
            const from = date.minus({month: 1});
            return {
                from,
                to: from.endOf("month"),
            };
        }
        case "last-year": {
            const date = now.startOf("year");
            const from = date.minus({year: 1});
            return {
                from,
                to: from.endOf("year"),
            };
        }
        case "current-week": {
            const date = now.startOf("week");
            return {
                from: date,
                to:   date.endOf("week"),
            };
        }
        case "current-month": {
            const date = now.startOf("month");
            return {
                from: date,
                to:   date.endOf("month"),
            };
        }
        case "current-year": {
            const date = now.startOf("year");
            return {
                from: date,
                to:   date.endOf("year"),
            };
        }
    }
};
