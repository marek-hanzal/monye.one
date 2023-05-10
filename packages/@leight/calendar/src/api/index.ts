import {DateTime} from "@leight/i18n";

export interface IDateRange {
    from: DateTime;
    to: DateTime;
}

export * from "./months";
export * from "./weeks";
export * from "./years";
