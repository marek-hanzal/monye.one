import {CalendarEventSourceSchema} from "@leight/calendar";
import {z}                         from "@leight/zod";

export const CalendarEventBaseSchema = CalendarEventSourceSchema.EntitySchema.merge(z.object({
    amount:  z.number(),
    outcome: z.number(),
    income:  z.number(),
}));
