import {CalendarEventSchema as CoolCalendarEventSchema} from "@leight/calendar";
import {QuerySchema}                                    from "@leight/query";
import {SortSchema}                                     from "@leight/sort";
import {
    type ISource,
    type ISourceSchema
}                                                       from "@leight/source";
import {z}                                              from "@leight/zod";

export const CalendarEventSchema = CoolCalendarEventSchema.merge(z.object({
    foo: z.string().optional(),
}));
export type ICalendarEventSchema = typeof CalendarEventSchema;
export type ICalendarEvent = z.infer<ICalendarEventSchema>;

export const CalendarEventSortSchema = SortSchema;
export type ICalendarEventSortSchema = typeof CalendarEventSortSchema;
export type ICalendarEventSort = z.infer<ICalendarEventSortSchema>;

export interface ICalendarEventSourceSchema extends ISourceSchema<
    ICalendarEventSchema
> {
}

export interface ICalendarEventSource extends ISource<ICalendarEventSourceSchema> {
}

export const CalendarEventQuerySchema = QuerySchema({});
export type ICalendarEventQuerySchema = typeof CalendarEventQuerySchema;
export type ICalendarEventQuery = z.infer<ICalendarEventQuerySchema>;

export const $CalendarEventSource = Symbol.for("@monye.one/ICalendarEventSource");
