import {type IContainer}     from "@leight/container";
import {
    $CalendarEventSource,
    $CalendarEventSourceMapper,
    $CalendarEventSourceService,
    type ICalendarEventSource,
    type ICalendarEventSourceMapper
}                            from "@monye.one/book";
import {
    CalendarEventBaseSourceMapper,
    CalendarEventBaseSourceService,
    type ICalendarEventSourceService
}                            from "./sdk";
import {CalendarEventSource} from "./source";

export interface IBookContainer {
    CalendarEventSource: ICalendarEventSource;
    CalendarEventSourceService: ICalendarEventSourceService;
    CalendarEventSourceMapper: ICalendarEventSourceMapper;
}

export const BookContainer = (container: IContainer): IBookContainer => {
    container
        .bindClass($CalendarEventSource, CalendarEventSource)
        .bindClass($CalendarEventSourceService, CalendarEventBaseSourceService)
        .bindClass($CalendarEventSourceMapper, CalendarEventBaseSourceMapper);

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
