import {createStoreContext} from "@leight/context-client";
import {
    type IStoreProps,
    type IStorePropsType
}                           from "@leight/zustand";
import {
    type ICalendarProps,
    type IUseCalendarOptions,
    useCalendar
}                           from "@tuplo/use-calendar";
import {
    type ComponentProps,
    type FC
}                           from "react";

export type ICalendarStoreStoreProps = IStoreProps<IStorePropsType, {
    calendar: ICalendarProps;
}>

export const {
                 Provider:         CalendarStoreProvider,
                 useState:         useCalendarStoreState,
                 useOptionalState: useOptionalCalendarStoreState,
                 useStore:         useCalendarStoreStore,
                 useOptionalStore: useOptionalCalendarStoreStore,
             } = createStoreContext<ICalendarStoreStoreProps>({
    state: ({state}) => () => ({
        ...state,
    }),
    name:  "CalendarStoreContext",
    hint:  "Add CalendarStoreProvider.",
});

export interface ICalendarProviderProps extends Omit<ComponentProps<typeof CalendarStoreProvider>, "state"> {
    options?: Partial<IUseCalendarOptions>;
}

export const CalendarProvider: FC<ICalendarProviderProps> = ({options, ...props}) => {
    const calendar = useCalendar(options);
    return <CalendarStoreProvider
        state={{
            calendar,
        }}
        {...props}
    />;
};
