/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {SortOrderSchema} from "@leight/sort";
import {
	type InferSourceSchema,
	withSourceSchema,
	CreateSchema,
	PatchSchema
} from "@leight/source";
import {z} from "@leight/zod";
import {CalendarEventBaseSchema} from "../../schema";
import {CalendarEventSourceSchema as CoolCalendarEventSourceSchema} from "@leight/calendar";
import {ParamsSchema} from "@leight/query";

export type ICalendarEventSourceSchema = InferSourceSchema<typeof CalendarEventSourceSchema>;

const $CalendarEventSchema = CalendarEventBaseSchema;
const $CalendarEventCreateSchema = CreateSchema;
const $CalendarEventPatchSchema = PatchSchema;
export const CalendarEventSourceSchema = withSourceSchema({
    EntitySchema: $CalendarEventSchema,
    DtoSchema: CalendarEventBaseSchema,
    ToCreateSchema: $CalendarEventCreateSchema,
    CreateSchema: $CalendarEventCreateSchema,
    ToPatchSchema: $CalendarEventPatchSchema,
    PatchSchema: $CalendarEventPatchSchema,
    FilterSchema: CoolCalendarEventSourceSchema['FilterSchema'],
    ParamsSchema: ParamsSchema,
    SortSchema: z.object({
        id: SortOrderSchema
    }),
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_tzl3ous5ze3fpwoxbwxmngim = true;