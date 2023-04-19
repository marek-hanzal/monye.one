import {type IContainer} from "@leight/container";
import {
    $CalendarEventSource,
    $CalendarEventSourceMapper,
    type ICalendarEventSource
}                        from "@monye.one/book";
import {
    CalendarEventSource,
    CalendarEventSourceMapper,
    type ICalendarEventSourceMapper
}                        from "./sdk";

export interface IBookContainer {
    CalendarEventSource: ICalendarEventSource;
    CalendarEventSourceMapper: ICalendarEventSourceMapper;
}

export const BookContainer = (container: IContainer): IBookContainer => {
    container
        .bindClass($CalendarEventSource, CalendarEventSource)
        .bindClass($CalendarEventSourceMapper, CalendarEventSourceMapper);

    return {
        get CalendarEventSource() {
            return container.resolve<ICalendarEventSource>($CalendarEventSource);
        },
        get CalendarEventSourceMapper() {
            return container.resolve<ICalendarEventSourceMapper>($CalendarEventSourceMapper);
        },
    };
};
