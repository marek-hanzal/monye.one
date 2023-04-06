/**
	Source code containing improved Zustand store stuff for Source support (client-side).
 */
import {
	createSourceContext,
	type ISourceProps
} from "@leight/source-client";
import {createSortContext} from "@leight/sort-client";
import {
	type IBookCalendarEventSourceSchema,
	BookCalendarEventSchema,
	type IBookCalendarEventSortSchema,
	BookCalendarEventSortSchema
} from "@monye.one/book";

export type IBookCalendarEventSource = ISourceProps<IBookCalendarEventSourceSchema>;

/**
 * Defines Store for BookCalendarEvent, so you can access it's data.
 */
export const BookCalendarEventSourceStore = createSourceContext<IBookCalendarEventSourceSchema>({
    name:   "BookCalendarEvent",
    schema: BookCalendarEventSchema,
});
/**
 * Defines Store for BookCalendarEvent sorting data.
 */
export const BookCalendarEventSortStore = createSortContext<IBookCalendarEventSortSchema>({
    name:   "BookCalendarEventSort",
    schema: BookCalendarEventSortSchema,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_rlxqezn89v36uj2x0nd3cxa0 = true;