import {type IContainer}     from "@leight/container";
import {
    $CalendarEventSource,
    type ICalendarEventSource
}                            from "@monye.one/book";
import {CalendarEventSource} from "./sdk";

export interface IBookContainer {
    CalendarEventSource: ICalendarEventSource;
}

export const BookContainer = (container: IContainer): IBookContainer => {
    container
        .bindClass($CalendarEventSource, CalendarEventSource);

    return {
        get CalendarEventSource() {
            return container.resolve<ICalendarEventSource>($CalendarEventSource);
        },
    };
};
