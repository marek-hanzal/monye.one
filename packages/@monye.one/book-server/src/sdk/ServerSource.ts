/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type ICalendarEventSource,
	type ICalendarEventSourceSchema
} from "@monye.one/book";
import {
	AbstractSourceMapper,
	type ISourceMapper
} from "@leight/source-server";
import {CalendarEventBaseSourceEx} from "../source";

export type ICalendarEventSourceMapper = ISourceMapper<ICalendarEventSourceSchema>;

export class CalendarEventSource extends CalendarEventBaseSourceEx implements ICalendarEventSource {
}

export class CalendarEventSourceMapper extends AbstractSourceMapper<ICalendarEventSourceSchema> implements ICalendarEventSourceMapper {
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_w7m4dqihlm6d0br1x2ck261y = true;