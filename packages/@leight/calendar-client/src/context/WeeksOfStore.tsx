import {
    type IWeeks,
    weeksOf
}                           from "@leight/calendar";
import {createStoreContext} from "@leight/context-client";
import {DateTime}           from "@leight/i18n";
import {generateId}         from "@leight/utils";
import {type IStoreProps}   from "@leight/zustand";
import {
    type ComponentProps,
    type FC
}                           from "react";

export type IWeeksStoreProps = IStoreProps<{
    id: string;
    /**
     * Set weeks of the given date
     */
    weeksOf(date: DateTime): IWeeks;
    /**
     * Move to the current month
     */
    today(): IWeeks;
    /**
     * Change weeks to the previous month
     */
    prevMonth(): IWeeks;
    /**
     * Change weeks to the next month
     */
    nextMonth(): IWeeks;
    prevYear(): IWeeks;
    nextYear(): IWeeks;
}, {
    /**
     * Calendar is computed based on an input, so it cannot be required
     * in the time of store creation.
     */
    readonly weeks: IWeeks;
}>

export const WeeksOfStore = createStoreContext<IWeeksStoreProps>({
    state: ({state}) => (set, get) => ({
        id: generateId(),
        weeksOf(date: DateTime) {
            set({
                id:    generateId(),
                weeks: weeksOf({date}),
            });
            return get().weeks;
        },
        today() {
            set({
                id:    generateId(),
                weeks: weeksOf({date: DateTime.now()}),
            });
            return get().weeks;
        },
        prevMonth() {
            set(({weeks: {date}}) => ({
                id:    generateId(),
                weeks: weeksOf({date: date.minus({month: 1})}),
            }));
            return get().weeks;
        },
        nextMonth() {
            set(({weeks: {date}}) => ({
                id:    generateId(),
                weeks: weeksOf({date: date.plus({month: 1})}),
            }));
            return get().weeks;
        },
        prevYear() {
            set(({weeks: {date}}) => ({
                id:    generateId(),
                weeks: weeksOf({date: date.minus({year: 1})}),
            }));
            return get().weeks;
        },
        nextYear() {
            set(({weeks: {date}}) => ({
                id:    generateId(),
                weeks: weeksOf({date: date.plus({year: 1})}),
            }));
            return get().weeks;
        },
        ...state,
    }),
    name:  "WeeksOfStore",
    hint:  "Add WeeksOfProvider or CalendarProvider.",
});

export interface IWeeksOfProviderProps extends Omit<ComponentProps<typeof WeeksOfStore["Provider"]>, "state"> {
    date?: DateTime;
}

export const WeeksOfProvider: FC<IWeeksOfProviderProps> = ({date, ...props}) => {
    return <WeeksOfStore.Provider
        state={{
            weeks: weeksOf({date}),
        }}
        {...props}
    />;
};
