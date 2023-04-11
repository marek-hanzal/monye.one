import {CalendarEventSchema as CoolCalendarEventSchema} from "@leight/calendar";
import {z}                                              from "@leight/zod";

export const CalendarEventBaseSchema = CoolCalendarEventSchema.merge(z.object({
    amount:  z.number(),
    outcome: z.number(),
    income:  z.number(),
}));
