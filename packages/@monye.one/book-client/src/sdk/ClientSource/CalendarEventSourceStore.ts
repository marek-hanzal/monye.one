/**
	Source code containing improved Zustand store stuff for Source support (client-side).
 */
import {withSourceStore} from "@leight/source-client";
import {CalendarEventSourceSchema} from "@monye.one/book";

export const CalendarEventSourceStore = withSourceStore({
    name: "CalendarEvent",
    SourceSchema: CalendarEventSourceSchema,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_trq2wmpziuiaf1hvjdtkaq49 = true;