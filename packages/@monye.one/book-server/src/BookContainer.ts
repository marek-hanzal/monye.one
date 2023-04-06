import {type IContainer}         from "@leight/container";
import {
    $CalendarEventSource,
    type ICalendarEventSource
}                                from "@monye.one/book";
import {CalendarEventBaseSource} from "./sdk";

export interface IBookContainer {
    CalendarEventSource: ICalendarEventSource;
}

export const BookContainer = (container: IContainer): IBookContainer => {
    container
        .bindClass($CalendarEventSource, CalendarEventBaseSource);

    return {
        get CalendarEventSource() {
            return container.resolve<ICalendarEventSource>($CalendarEventSource);
        },
    };
};
