import {type IContainer} from "@leight/container";
import {$CalendarEventRepository} from "@monye.one/book";
import {CalendarEventRepository} from "./repository";
import {withCalendarEventRepositoryContainer} from "./sdk";

export const withBookContainer = (container: IContainer) => {
    withCalendarEventRepositoryContainer(container);
    container
        .bindClass($CalendarEventRepository, CalendarEventRepository);
};
