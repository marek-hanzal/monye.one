/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	WithIdentitySchema,
	WithOptionalIdentitySchema
} from "@leight/source";
import {
	router,
	procedure
} from "../../router";
import {CalendarEventSourceSchema} from "@monye.one/book";
import {CalendarEventSourceProcedure} from "@monye.one/book-server";

export const CalendarEventSourceRouter = router({
    create: procedure
                .input(CalendarEventSourceSchema.ToCreateSchema)
                .mutation(CalendarEventSourceProcedure.handleCreate),
    patch:  procedure
                .input(CalendarEventSourceSchema.ToPatchSchema)
                .mutation(CalendarEventSourceProcedure.handlePatch),
    delete:  procedure
                .input(WithIdentitySchema)
                .mutation(CalendarEventSourceProcedure.handleDelete),
    deleteWith:  procedure
                .input(CalendarEventSourceSchema.QuerySchema)
                .mutation(CalendarEventSourceProcedure.handleDeleteWith),
    query:  procedure
                .input(CalendarEventSourceSchema.QueryOptionalSchema)
                .query(CalendarEventSourceProcedure.handleQuery),
    count:  procedure
                .input(CalendarEventSourceSchema.QueryOptionalSchema)
                .query(CalendarEventSourceProcedure.handleCount),
    fetch:  procedure
                .input(CalendarEventSourceSchema.QuerySchema)
                .query(CalendarEventSourceProcedure.handleFetch),
    find:   procedure
                .input(WithIdentitySchema)
                .query(CalendarEventSourceProcedure.handleFind),
    findOptional:   procedure
                .input(WithOptionalIdentitySchema)
                .query(CalendarEventSourceProcedure.handleFindOptional),
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_ci02quwg37o9rcwgxnjazpik = true;