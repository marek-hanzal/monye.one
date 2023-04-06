/**
	Source code containing improved Zustand store stuff for Source support (client-side).
 */
import {
	createSourceContext,
	type ISourceProps
} from "@leight/source-client";
import {createSortContext} from "@leight/sort-client";
import {
	type ICalendarEventSourceSchema,
	CalendarEventSchema,
	type ICalendarEventSortSchema,
	CalendarEventSortSchema
} from "@monye.one/book";

export type ICalendarEventSource = ISourceProps<ICalendarEventSourceSchema>;

/**
 * Defines Store for CalendarEvent, so you can access it's data.
 */
export const CalendarEventSourceStore = createSourceContext<ICalendarEventSourceSchema>({
    name:   "CalendarEvent",
    schema: CalendarEventSchema,
});
/**
 * Defines Store for CalendarEvent sorting data.
 */
export const CalendarEventSortStore = createSortContext<ICalendarEventSortSchema>({
    name:   "CalendarEventSort",
    schema: CalendarEventSortSchema,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_h3aie6wjz61k4ruzawev0n08 = true;