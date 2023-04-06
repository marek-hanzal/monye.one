import {CalendarEventSchema} from "@leight/calendar";
import {type ISourceSchema}  from "@leight/source";
import {z}                   from "@leight/zod";

export const BookCalendarEventSchema = CalendarEventSchema.merge(z.object({
    foo: z.string().optional(),
}));
export type IBookCalendarEventSchema = typeof BookCalendarEventSchema;
export type IBookCalendarEvent = z.infer<IBookCalendarEventSchema>;

export interface IBookCalendarSourceSchema extends ISourceSchema<
    IBookCalendarEventSchema
> {
}
