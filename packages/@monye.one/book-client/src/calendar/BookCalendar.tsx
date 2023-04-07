import {
    Calendar,
    CalendarProvider,
    type ICalendarProps
}                from "@leight/calendar-client";
import {
    CalendarEventSchema,
    type ICalendarEventSourceSchema
}                from "@monye.one/book";
import {type FC} from "react";
import {
    CalendarEventSource,
    CalendarEventSourceStore
}                from "../sdk";

export interface IBookCalendarProps extends Omit<ICalendarProps<ICalendarEventSourceSchema>, "useEventState"> {
}

export const BookCalendar: FC<IBookCalendarProps> = props => {
    return <CalendarEventSource>
        <CalendarProvider>
            <Calendar<ICalendarEventSourceSchema>
                events={{
                    schema:    CalendarEventSchema,
                    useSource: CalendarEventSourceStore.useState,
                }}
                renderDayInline={({events}) => {
                    if (!events.length) {
                        return null;
                    }
                    return <>ahoj</>;
                }}
                {...props}
            />
        </CalendarProvider>
    </CalendarEventSource>;
};
