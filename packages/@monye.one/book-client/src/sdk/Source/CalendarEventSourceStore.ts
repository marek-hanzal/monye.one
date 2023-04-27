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
export const $leight_zlyc29r5gjwrbf4s2v17ayy9 = true;