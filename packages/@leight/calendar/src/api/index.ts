import {FilterSchema} from "@leight/filter";
import {DateTime}     from "@leight/i18n";
import {
    EntitySchema,
    type ICreateSchema,
    type IPatchSchema,
    type ISourceSchema
}                     from "@leight/source";
import {z}            from "@leight/zod";

/**
 * Defines an individual calendar item being rendered/handled in a particular day.
 */
export const CalendarEventSchema = EntitySchema.merge(z.object({
    date: z.string().transform(input => DateTime.fromISO(input)),
    prev: z.string().optional().transform(input => input ? DateTime.fromISO(input) : undefined),
    next: z.string().optional().transform(input => input ? DateTime.fromISO(input) : undefined),
}));
export type ICalendarEventSchema = typeof CalendarEventSchema;
export type ICalendarEvent = z.infer<ICalendarEventSchema>;

export const CalendarEventFilterSchema = FilterSchema.merge(z.object({
    from: z.string().transform(input => DateTime.fromISO(input)),
    to:   z.string().transform(input => DateTime.fromISO(input)),
}));
export type ICalendarEventFilterSchema = typeof CalendarEventFilterSchema;
export type ICalendarEventFilter = z.infer<ICalendarEventFilterSchema>;

export type ICalendarEventSourceSchema = ISourceSchema<
    ICalendarEventSchema,
    ICreateSchema,
    IPatchSchema,
    ICalendarEventFilterSchema
>;

export interface IDateRange {
    from: DateTime;
    to: DateTime;
}

export * from "./months";
export * from "./weeks";
export * from "./years";
