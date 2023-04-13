/**
	Source code of the common stuff for CalendarEvent which could be shared between server and client side.
 */
import {
	type IWithIdentity,
	type ISourceSchema
} from "@leight/source";
import {type IUseQuery} from "@leight/react-query";
import {
	type ICalendarEventCreateSchema,
	type ICalendarEventFilterSchema,
	type ICalendarEventParamSchema,
	type ICalendarEventPatchSchema,
	type ICalendarEventSchema,
	type ICalendarEventSortSchema
} from "./EntitySchema";

export type IUseCalendarEventQuery = IUseQuery<ICalendarEventSourceSchema["Query"] | undefined, ICalendarEventSourceSchema["Entity"][]>;
export type IUseCalendarEventCountQuery = IUseQuery<ICalendarEventSourceSchema["Query"] | undefined, number>;
export type IUseCalendarEventFetchQuery = IUseQuery<ICalendarEventSourceSchema["Query"], ICalendarEventSourceSchema["Entity"]>;
export type IUseCalendarEventFindQuery = IUseQuery<IWithIdentity, ICalendarEventSourceSchema["Entity"]>;

export interface ICalendarEventSourceSchema extends ISourceSchema<
    ICalendarEventSchema,
    ICalendarEventCreateSchema,
    ICalendarEventPatchSchema,
    ICalendarEventFilterSchema,
    ICalendarEventSortSchema,
    ICalendarEventParamSchema
 > {
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_fsmnaoinve9maoanarpw5hue = true;