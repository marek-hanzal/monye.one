/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type ISource,
	type IUseSourceQuery
} from "@leight/source";
import {type ICalendarEventSourceSchema} from "./CalendarEventSourceSchema";

export type IUseCalendarEventSourceQuery = IUseSourceQuery<ICalendarEventSourceSchema>;

export interface ICalendarEventSource extends ISource<ICalendarEventSourceSchema> {
}

export const $CalendarEventSource = Symbol.for("@monye.one/book/ICalendarEventSource");
export const $CalendarEventSourceMapper = Symbol.for("@monye.one/book/ICalendarEventSourceMapper");
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_ezebczf5h0yzv3x3dh8lz5em = true;