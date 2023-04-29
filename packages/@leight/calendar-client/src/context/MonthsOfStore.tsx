import {
    type IMonths,
    monthsOf
}                           from "@leight/calendar";
import {createStoreContext} from "@leight/context-client";
import {DateTime}           from "@leight/i18n";
import {type IStoreProps}   from "@leight/zustand";
import {
    type ComponentProps,
    type FC
}                           from "react";

export type IMonthsStoreProps = IStoreProps<{
    /**
     * Set months of the given date
     */
    monthsOf(date: DateTime): IMonths;
    /**
     * Move to the current month
     */
    today(): IMonths;
    prevYear(): IMonths;
    nextYear(): IMonths;
}, {
    /**
     * Calendar is computed based on an input, so it cannot be required
     * in the time of store creation.
     */
    readonly months: IMonths;
}>

export const MonthsOfStore = createStoreContext<IMonthsStoreProps>({
    state: ({state}) => (set, get) => ({
        monthsOf(date: DateTime) {
            set({
                months: monthsOf({date}),
            });
            return get().months;
        },
        today() {
            set({
                months: monthsOf({date: DateTime.now()}),
            });
            return get().months;
        },
        prevYear() {
            set(({months: {date}}) => ({
                months: monthsOf({date: date.minus({year: 1})}),
            }));
            return get().months;
        },
        nextYear() {
            set(({months: {date}}) => ({
                months: monthsOf({date: date.plus({year: 1})}),
            }));
            return get().months;
        },
        ...state,
    }),
    name:  "MonthsOfStore",
    hint:  "Add MonthsOfProvider or CalendarProvider.",
});

export interface IMonthsOfProviderProps extends Omit<ComponentProps<typeof MonthsOfStore["Provider"]>, "state"> {
    date?: DateTime;
}

export const MonthsOfProvider: FC<IMonthsOfProviderProps> = ({date, ...props}) => {
    return <MonthsOfStore.Provider
        state={{
            months: monthsOf({date}),
        }}
        {...props}
    />;
};
