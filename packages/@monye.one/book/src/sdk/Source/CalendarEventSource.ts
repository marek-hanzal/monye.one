/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type ISource,
	type IUseSourceQuery
} from "@leight/source";
import {type ICalendarEventSourceSchemaType} from "../../schema/CalendarEventSourceSchema";

export type IUseCalendarEventSourceQuery = IUseSourceQuery<ICalendarEventSourceSchemaType>;

export interface ICalendarEventSource extends ISource<ICalendarEventSourceSchemaType> {
}

export const $CalendarEventSource = Symbol.for("@monye.one/book/ICalendarEventSource");
export const $CalendarEventSourceMapper = Symbol.for("@monye.one/book/ICalendarEventSourceMapper");
export const $CalendarEventSourceService = Symbol.for("@monye.one/book/ICalendarEventSourceService");
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_bsbokp32yxmi8cpdbdu120e7 = true;