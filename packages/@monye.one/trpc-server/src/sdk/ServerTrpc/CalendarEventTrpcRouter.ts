/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	router,
	procedure
} from "../../router";
import {CalendarEventSourceProcedure} from "@monye.one/book-server";

export const CalendarEventSourceRouter = router({
    create: procedure
                .input(CalendarEventSourceProcedure.CreateSchema)
                .mutation(CalendarEventSourceProcedure.Create),
    patch:  procedure
                .input(CalendarEventSourceProcedure.PatchSchema)
                .mutation(CalendarEventSourceProcedure.Patch),
    delete:  procedure
                .input(CalendarEventSourceProcedure.IdentitySchema)
                .mutation(CalendarEventSourceProcedure.Delete),
    deleteWith:  procedure
                .input(CalendarEventSourceProcedure.QuerySchema)
                .mutation(CalendarEventSourceProcedure.DeleteWith),
    query:  procedure
                .input(CalendarEventSourceProcedure.QueryOptionalSchema)
                .query(CalendarEventSourceProcedure.Query),
    count:  procedure
                .input(CalendarEventSourceProcedure.QueryOptionalSchema)
                .query(CalendarEventSourceProcedure.QueryCount),
    fetch:  procedure
                .input(CalendarEventSourceProcedure.QuerySchema)
                .query(CalendarEventSourceProcedure.Fetch),
    find:   procedure
                .input(CalendarEventSourceProcedure.IdentitySchema)
                .query(CalendarEventSourceProcedure.Find),
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_lj69o77xh3fo2k5pzw23u2ny = true;