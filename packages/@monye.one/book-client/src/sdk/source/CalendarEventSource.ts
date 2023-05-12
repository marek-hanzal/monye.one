/**
	Source code containing improved Zustand store stuff for Source support (client-side).
 */
import {withSource} from "@leight/source-client";
import {
	CalendarEventSourceSchema as SourceSchema,
	type ICalendarEventSourceSchema as ISourceSchema
} from "@monye.one/book";
import {UseCalendarEventRepository as UseRepository} from "../trpc/UseCalendarEventRepository";
import {useCalendarEventInvalidator as useInvalidator} from "../trpc/useCalendarEventInvalidator";

export const CalendarEventSource = withSource<ISourceSchema>({
    name: "CalendarEvent",
    schema: SourceSchema,
    repository: UseRepository,
    useInvalidator,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_cvgb82dfvn9wwuakwpvknghy = true;