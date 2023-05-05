/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	router,
	procedure
} from "../../router";
import {JobRepositoryHandler} from "@leight/job-server";

export const JobRepositoryRouter = router({
    create: procedure
                .input(JobSourceProcedure.CreateSchema)
                .mutation(JobSourceProcedure.handleCreate),
    patch:  procedure
                .input(JobSourceProcedure.PatchSchema)
                .mutation(JobSourceProcedure.handlePatch),
    patchBy:  procedure
                .input(JobSourceProcedure.PatchBySchema)
                .mutation(JobSourceProcedure.handlePatchBy),
    upsert:  procedure
                .input(JobSourceProcedure.UpsertSchema)
                .mutation(JobSourceProcedure.handleUpsert),
    delete:  procedure
                .input(JobSourceProcedure.DeleteSchema)
                .mutation(JobSourceProcedure.handleDelete),
    deleteBy:  procedure
                .input(JobSourceProcedure.DeleteBySchema)
                .mutation(JobSourceProcedure.handleDeleteBy),
    query:  procedure
                .input(JobSourceProcedure.QuerySchema)
                .query(JobSourceProcedure.handleQuery),
    count:  procedure
                .input(JobSourceProcedure.CountSchema)
                .query(JobSourceProcedure.handleCount),
    fetch:  procedure
                .input(JobSourceProcedure.FetchSchema)
                .query(JobSourceProcedure.handleFetch),
    fetch$:  procedure
                .input(JobSourceProcedure.Fetch$Schema)
                .query(JobSourceProcedure.handleFetchOptional),
    get:   procedure
                .input(WithIdentitySchema)
                .query(JobSourceProcedure.handleGet),
    get$:   procedure
                .input(WithIdentitySchema)
                .query(JobSourceProcedure.handleFindOptional),
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_v53d88dck9cjux9c0x7w12nx = true;