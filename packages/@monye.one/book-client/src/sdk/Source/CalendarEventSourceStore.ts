/**
	Source code containing improved Zustand store stuff for Source support (client-side).
 */
import {withSourceStore} from "@leight/source-client";
import {CalendarEventSourceSchema} from "@monye.one/book";
import {UseCalendarEventSourceQuery} from "../Trpc/UseCalendarEventSourceQuery";

export const CalendarEventSourceStore = withSourceStore({
    name: "CalendarEvent",
    SourceSchema: CalendarEventSourceSchema,
    UseSourceQuery: UseCalendarEventSourceQuery,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_hz1cxz5udi8qbxmt113kgiml = true;