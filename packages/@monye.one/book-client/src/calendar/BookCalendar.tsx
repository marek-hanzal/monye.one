import {
    Calendar,
    CalendarProvider,
    type ICalendarProps
}                                       from "@leight/calendar-client";
import {IBookCalendarEventSourceSchema} from "@monye.one/book";
import {type FC}                        from "react";

export interface IBookCalendarProps extends Omit<ICalendarProps<IBookCalendarEventSourceSchema>, "useEventState"> {
}

export const BookCalendar: FC<IBookCalendarProps> = props => {
    return <CalendarProvider>
        <Calendar<IBookCalendarEventSourceSchema>
            // usS={BookCalendarEventStore.useState}
            renderDayInline={({events}) => {
                console.log("events", events);
                return <>ahoj</>;
            }}
            {...props}
        />
    </CalendarProvider>;
};
