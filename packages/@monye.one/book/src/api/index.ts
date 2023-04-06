import {CalendarEventSchema} from "@leight/calendar";
import {SortSchema}          from "@leight/sort";
import {type ISourceSchema}  from "@leight/source";
import {z}                   from "@leight/zod";

export const BookCalendarEventSchema = CalendarEventSchema.merge(z.object({
    foo: z.string().optional(),
}));
export type IBookCalendarEventSchema = typeof BookCalendarEventSchema;
export type IBookCalendarEvent = z.infer<IBookCalendarEventSchema>;

export const BookCalendarEventSortSchema = SortSchema;
export type IBookCalendarEventSortSchema = typeof BookCalendarEventSortSchema;
export type IBookCalendarEventSort = z.infer<IBookCalendarEventSortSchema>;

export interface IBookCalendarEventSourceSchema extends ISourceSchema<
    IBookCalendarEventSchema
> {
}
