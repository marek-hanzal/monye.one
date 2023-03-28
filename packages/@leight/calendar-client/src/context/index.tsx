import {createStoreContext} from "@leight/context-client";
import {type IStoreProps}   from "@leight/zustand";
import {
    type ComponentProps,
    type FC
}                           from "react";

export type ICalendarStoreStoreProps = IStoreProps<{
    foo: string;
}>

export const {
                 Provider:         CalendarStoreProvider,
                 useState:         useCalendarStoreState,
                 useOptionalState: useOptionalCalendarStoreState,
                 useStore:         useCalendarStoreStore,
                 useOptionalStore: useOptionalCalendarStoreStore,
             } = createStoreContext<ICalendarStoreStoreProps>({
    state: () => () => ({
        foo: "",
    }),
    name:  "CalendarStoreContext",
    hint:  "Add CalendarStoreProvider.",
});

export interface ICalendarProviderProps extends Omit<ComponentProps<typeof CalendarStoreProvider>, "state"> {
}

export const CalendarProvider: FC<ICalendarProviderProps> = ({...props}) => {
    return <CalendarStoreProvider
        {...props}
    />;
};
