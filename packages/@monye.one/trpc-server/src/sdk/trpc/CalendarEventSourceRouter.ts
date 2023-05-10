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
import {CalendarEventRepositoryHandler} from "@monye.one/book-server";

export const CalendarEventRepositoryRouter = router({
    create: procedure
                .input(CalendarEventSourceSchema.CreateSchema)
                .mutation(CalendarEventRepositoryHandler.handleCreate),
    patch:  procedure
                .input(CalendarEventSourceSchema.PatchSchema)
                .mutation(CalendarEventRepositoryHandler.handlePatch),
    patchBy:  procedure
                .input(CalendarEventSourceSchema.PatchBySchema)
                .mutation(CalendarEventRepositoryHandler.handlePatchBy),
    upsert:  procedure
                .input(CalendarEventSourceSchema.UpsertSchema)
                .mutation(CalendarEventRepositoryHandler.handleUpsert),
    delete:  procedure
                .input(CalendarEventSourceSchema.DeleteSchema)
                .mutation(CalendarEventRepositoryHandler.handleDelete),
    deleteBy:  procedure
                .input(CalendarEventSourceSchema.DeleteBySchema)
                .mutation(CalendarEventRepositoryHandler.handleDeleteBy),
    query:  procedure
                .input(CalendarEventSourceSchema.QuerySchema)
                .query(CalendarEventRepositoryHandler.handleQuery),
    count:  procedure
                .input(CalendarEventSourceSchema.CountSchema)
                .query(CalendarEventRepositoryHandler.handleCount),
    fetch:  procedure
                .input(CalendarEventSourceSchema.FetchSchema)
                .query(CalendarEventRepositoryHandler.handleFetch),
    fetch$:  procedure
                .input(CalendarEventSourceSchema.Fetch$Schema)
                .query(CalendarEventRepositoryHandler.handleFetch$),
    get:   procedure
                .input(WithIdentitySchema)
                .query(CalendarEventRepositoryHandler.handleGet),
    get$:   procedure
                .input(WithOptionalIdentitySchema)
                .query(CalendarEventRepositoryHandler.handleGet$),
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_vuu26mqerjwp3yb45zac0vbf = true;