import {type IContainer} from "@leight/container";
import {
    $CalendarEventSource,
    $CalendarEventSourceMapper,
    $CalendarEventSourceService,
    type ICalendarEventSource,
    type ICalendarEventSourceMapper
}                        from "@monye.one/book";
import {
    CalendarEventSource,
    CalendarEventSourceMapper,
    CalendarEventSourceService,
    type ICalendarEventSourceService
}                        from "./sdk";

export interface IBookContainer {
    CalendarEventSource: ICalendarEventSource;
    CalendarEventSourceService: ICalendarEventSourceService;
    CalendarEventSourceMapper: ICalendarEventSourceMapper;
}

export const BookContainer = (container: IContainer): IBookContainer => {
    container
        .bindClass($CalendarEventSource, CalendarEventSource)
        .bindClass($CalendarEventSourceService, CalendarEventSourceService)
        .bindClass($CalendarEventSourceMapper, CalendarEventSourceMapper);

    return {
        get CalendarEventSource() {
            return container.resolve<ICalendarEventSource>($CalendarEventSource);
        },
        get CalendarEventSourceService() {
            return container.resolve<ICalendarEventSourceService>($CalendarEventSourceService);
        },
        get CalendarEventSourceMapper() {
            return container.resolve<ICalendarEventSourceMapper>($CalendarEventSourceMapper);
        },
    };
};
