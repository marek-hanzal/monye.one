/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	WithIdentitySchema,
	WithIdentity$Schema
} from "@leight/source";
import {
	router,
	procedure
} from "../../router";
import {FilterSourceSchema} from "@leight/filter";
import {FilterRepositoryHandler} from "@leight/filter-server";

export const FilterRepositoryRouter = router({
    create: procedure
                .input(FilterSourceSchema.ToCreateSchema)
                .mutation(FilterRepositoryHandler.handleCreate),
    patch:  procedure
                .input(FilterSourceSchema.ToPatchSchemaProps)
                .mutation(FilterRepositoryHandler.handlePatch),
    patchBy:  procedure
                .input(FilterSourceSchema.ToPatchBySchemaProps)
                .mutation(FilterRepositoryHandler.handlePatchBy),
    upsert:  procedure
                .input(FilterSourceSchema.ToUpsertSchemaProps)
                .mutation(FilterRepositoryHandler.handleUpsert),
    delete:  procedure
                .input(FilterSourceSchema.DeleteSchema)
                .mutation(FilterRepositoryHandler.handleDelete),
    deleteBy:  procedure
                .input(FilterSourceSchema.DeleteBySchema)
                .mutation(FilterRepositoryHandler.handleDeleteBy),
    query:  procedure
                .input(FilterSourceSchema.QuerySchema)
                .query(FilterRepositoryHandler.handleQuery),
    count:  procedure
                .input(FilterSourceSchema.CountSchema)
                .query(FilterRepositoryHandler.handleCount),
    fetch:  procedure
                .input(FilterSourceSchema.FetchSchema)
                .query(FilterRepositoryHandler.handleFetch),
    fetch$:  procedure
                .input(FilterSourceSchema.Fetch$Schema)
                .query(FilterRepositoryHandler.handleFetch$),
    get:   procedure
                .input(WithIdentitySchema)
                .query(FilterRepositoryHandler.handleGet),
    get$:   procedure
                .input(WithIdentity$Schema)
                .query(FilterRepositoryHandler.handleGet$),
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_wsce62ohtnijnyprllli3q75 = true;