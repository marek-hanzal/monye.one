import {CalendarEventSchema as CoolCalendarEventSchema} from "@leight/calendar";
import {z}                                              from "@leight/zod";

export const CalendarEventBaseSchema = CoolCalendarEventSchema.merge(z.object({
    foo: z.string().optional(),
}));
