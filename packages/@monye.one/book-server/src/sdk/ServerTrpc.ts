/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {withSourceProcedure} from "@leight/trpc-source-server";
import {
	$CalendarEventSource,
	CalendarEventSourceSchema,
	type ICalendarEventSourceSchema
} from "@monye.one/book";

export const CalendarEventSourceProcedure = withSourceProcedure<ICalendarEventSourceSchema>({
    source: $CalendarEventSource,
    schema: CalendarEventSourceSchema['QuerySchema'],
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_k7989z09n5u9og0jvmiv7x3q = true;