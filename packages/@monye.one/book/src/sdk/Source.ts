/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type ISource} from "@leight/source";
import {
	type IContainer,
	ServiceContext
} from "@leight/container";
import {type ICalendarEventSourceSchema} from "./SourceSchema";

export interface ICalendarEventSource extends ISource<ICalendarEventSourceSchema> {
}

export const $CalendarEventSource = Symbol.for("@monye.one/book/ICalendarEventSource");
export const CalendarEventSourceContext = (container: IContainer) => new ServiceContext<ICalendarEventSource>(container, $CalendarEventSource);
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_g1iygwkeebayiswp38d31lz1 = true;