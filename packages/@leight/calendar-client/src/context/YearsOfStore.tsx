import {
    type IYears,
    yearsOf
}                           from "@leight/calendar";
import {createStoreContext} from "@leight/context-client";
import {DateTime}           from "@leight/i18n";
import {type IStoreProps}   from "@leight/zustand";
import {
    type ComponentProps,
    type FC
}                           from "react";

export type IYearsStoreProps = IStoreProps<{
    /**
     * Set years of the given date
     */
    yearsOf(date: DateTime): IYears;
    /**
     * Move to the current year
     */
    today(): IYears;
    /**
     * Move to the previous year (floating years)
     */
    prevYear(): IYears;
    /**
     * Move to the next year (floating years)
     */
    nextYear(): IYears;
    /**
     * Move to the previous "page" of years
     */
    prevYears(): IYears;
    /**
     * Move to the next "page" of years
     */
    nextYears(): IYears;
}, {
    /**
     * Calendar is computed based on an input, so it cannot be required
     * in the time of store creation.
     */
    readonly years: IYears;
}>

export const YearsOfStore = createStoreContext<IYearsStoreProps>({
    state: ({state}) => (set, get) => ({
        yearsOf(date: DateTime) {
            set({
                years: yearsOf({date}),
            });
            return get().years;
        },
        today() {
            set({
                years: yearsOf({date: DateTime.now()}),
            });
            return get().years;
        },
        prevYear() {
            set(({years: {date}}) => ({
                years: yearsOf({date: date.minus({year: 1})}),
            }));
            return get().years;
        },
        nextYear() {
            set(({years: {date}}) => ({
                years: yearsOf({date: date.plus({year: 1})}),
            }));
            return get().years;
        },
        prevYears() {
            set(({years: {count, date}}) => ({
                years: yearsOf({date: date.minus({year: count})}),
            }));
            return get().years;
        },
        nextYears() {
            set(({years: {count, date}}) => ({
                years: yearsOf({date: date.plus({year: count})}),
            }));
            return get().years;
        },
        ...state,
    }),
    name:  "YearsOfStore",
    hint:  "Add YearsOfProvider or CalendarProvider.",
});

export interface IYearsOfProviderProps extends Omit<ComponentProps<typeof YearsOfStore["Provider"]>, "state"> {
    date?: DateTime;
}

export const YearsOfProvider: FC<IYearsOfProviderProps> = ({date, ...props}) => {
    return <YearsOfStore.Provider
        state={{
            years: yearsOf({date}),
        }}
        {...props}
    />;
};
