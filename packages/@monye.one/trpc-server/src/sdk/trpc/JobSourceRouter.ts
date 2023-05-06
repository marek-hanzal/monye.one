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
import {JobSourceSchema} from "@leight/job";
import {JobRepositoryHandler} from "@leight/job-server";

export const JobRepositoryRouter = router({
    create: procedure
                .input(JobSourceSchema.CreateSchema)
                .mutation(JobRepositoryHandler.handleCreate),
    patch:  procedure
                .input(JobSourceSchema.PatchSchema)
                .mutation(JobRepositoryHandler.handlePatch),
    patchBy:  procedure
                .input(JobSourceSchema.PatchBySchema)
                .mutation(JobRepositoryHandler.handlePatchBy),
    upsert:  procedure
                .input(JobSourceSchema.UpsertSchema)
                .mutation(JobRepositoryHandler.handleUpsert),
    delete:  procedure
                .input(JobSourceSchema.DeleteSchema)
                .mutation(JobRepositoryHandler.handleDelete),
    deleteBy:  procedure
                .input(JobSourceSchema.DeleteBySchema)
                .mutation(JobRepositoryHandler.handleDeleteBy),
    query:  procedure
                .input(JobSourceSchema.QuerySchema)
                .query(JobRepositoryHandler.handleQuery),
    count:  procedure
                .input(JobSourceSchema.CountSchema)
                .query(JobRepositoryHandler.handleCount),
    fetch:  procedure
                .input(JobSourceSchema.FetchSchema)
                .query(JobRepositoryHandler.handleFetch),
    fetch$:  procedure
                .input(JobSourceSchema.Fetch$Schema)
                .query(JobRepositoryHandler.handleFetch$),
    get:   procedure
                .input(WithIdentitySchema)
                .query(JobRepositoryHandler.handleGet),
    get$:   procedure
                .input(WithOptionalIdentitySchema)
                .query(JobRepositoryHandler.handleGet$),
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_u16rwzv18oiwbg021bp6ugbu = true;