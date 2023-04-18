/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {SortOrderSchema} from "@leight/sort";
import {
	type InferSourceSchema,
	type IUseSourceQuery,
	type ISource,
	WithIdentitySchema,
	withSourceSchema,
	CreateSchema,
	ToCreateSchema,
	ToPatchSchema
} from "@leight/source";
import {
	type IContainer,
	ServiceContext
} from "@leight/container";
import {z} from "@leight/zod";
import {CalendarEventBaseSchema as CoolCalendarEventBaseSchema} from "../api";
import {CalendarEventSourceSchema as CoolCalendarEventSourceSchema} from "@leight/calendar";
import {ParamsSchema} from "@leight/query";

export type ICalendarEventSourceSchema = InferSourceSchema<typeof CalendarEventSourceSchema>;
export type IUseCalendarEventSourceQuery = IUseSourceQuery<ICalendarEventSourceSchema>;

export interface ICalendarEventSource extends ISource<ICalendarEventSourceSchema> {
}

export const CalendarEventSourceSchema = withSourceSchema({
    EntitySchema: CoolCalendarEventBaseSchema,
    ToCreateSchema: ToCreateSchema,
    CreateSchema: CreateSchema,
    ToPatchSchema: ToPatchSchema,
    PatchSchema: WithIdentitySchema,
    FilterSchema: CoolCalendarEventSourceSchema['FilterSchema'],
    ParamsSchema: ParamsSchema,
    SortSchema: z.object({
        id: SortOrderSchema
    }),
});
export const $CalendarEventSource = Symbol.for("@monye.one/book/ICalendarEventSource");
export const CalendarEventSourceContext = (container: IContainer) => new ServiceContext<ICalendarEventSource>(container, $CalendarEventSource);
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_yosfz91ehliinwzszy7udbz1 = true;