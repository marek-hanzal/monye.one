/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {FilterSchema} from "@leight/filter";
import {
	ParamsSchema,
	QuerySchema
} from "@leight/query";
import {SortOrderSchema} from "@leight/sort";
import {
	WithIdentitySchema,
	CreateSchema
} from "@leight/source";
import {z} from "@leight/zod";
import {CalendarEventBaseSchema as CoolCalendarEventBaseSchema} from "../api";
import {CalendarEventFilterSchema as CoolCalendarEventFilterSchema} from "@leight/calendar";

export type ICalendarEventSchema = typeof CalendarEventSchema;
export type ICalendarEvent = z.infer<ICalendarEventSchema>;
export type ICalendarEventCreateSchema = typeof CalendarEventCreateSchema;
export type ICalendarEventCreate = z.infer<ICalendarEventCreateSchema>;
export type ICalendarEventPatchSchema = typeof CalendarEventPatchSchema;
export type ICalendarEventPatch = z.infer<ICalendarEventPatchSchema>;
export type ICalendarEventFilterSchema = typeof CalendarEventFilterSchema;
export type ICalendarEventFilter = z.infer<ICalendarEventFilterSchema>;
export type ICalendarEventParamSchema = typeof CalendarEventParamSchema;
export type ICalendarEventParam = z.infer<ICalendarEventParamSchema>;
export type ICalendarEventSortSchema = typeof CalendarEventSortSchema;
export type ICalendarEventSort = z.infer<ICalendarEventSortSchema>;
export type ICalendarEventQuerySchema = typeof CalendarEventQuerySchema;
export type ICalendarEventQuery = z.infer<ICalendarEventQuerySchema>;

/**
 * Schema definition for CalendarEvent
 */
export const CalendarEventSchema = CoolCalendarEventBaseSchema;
export const CalendarEventCreateSchema = CreateSchema;
export const CalendarEventPatchSchema = WithIdentitySchema;
export const CalendarEventFilterSchema = CoolCalendarEventFilterSchema;
export const CalendarEventParamSchema = ParamsSchema;
export const CalendarEventSortSchema = z.object({
    id: SortOrderSchema
});
/**
 * Query definition for CalendarEvent
 */
export const CalendarEventQuerySchema = QuerySchema({
    filterSchema: CalendarEventFilterSchema,
    sortSchema:   CalendarEventSortSchema,
    paramsSchema: CalendarEventParamSchema,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_mblvamaz9kxyu07ezxj4u5va = true;