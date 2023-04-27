/**
	Source code containing improved Zustand store stuff for Source support (client-side).
 */
import {withSourceStore} from "@leight/source-client";
import {CalendarEventSourceSchema} from "@monye.one/book";
import {UseCalendarEventSourceQuery} from "../Trpc/UseCalendarEventSourceQuery";

export const CalendarEventSourceStore = withSourceStore({
    name: "CalendarEvent",
    schema: CalendarEventSourceSchema,
    use: UseCalendarEventSourceQuery,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_o20r7braq8b3tetibo34wj3y = true;