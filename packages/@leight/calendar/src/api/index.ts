import {FilterSchema} from "@leight/filter";
import {
    DateTime,
    fromISO,
    withISO
}                     from "@leight/i18n";
import {
    DtoSchema,
    type ISourceSchemaType,
    withSourceSchema
}                     from "@leight/source";
import {z}            from "@leight/zod";

export const CalendarEventSourceSchema = withSourceSchema({
    /**
     * Defines an individual calendar item being rendered/handled in a particular day.
     */
    DtoSchema:    DtoSchema.merge(z.object({
        date: z.string().transform(withISO),
        prev: z.string().optional().transform(fromISO),
        next: z.string().optional().transform(fromISO),
    })),
    FilterSchema: FilterSchema.merge(z.object({
        from: z.string().transform(withISO),
        to:   z.string().transform(withISO),
    })),
});
export type ICalendarEventSourceSchemaType = ISourceSchemaType.of<typeof CalendarEventSourceSchema>;

export interface IDateRange {
    from: DateTime;
    to: DateTime;
}

export * from "./months";
export * from "./weeks";
export * from "./years";
