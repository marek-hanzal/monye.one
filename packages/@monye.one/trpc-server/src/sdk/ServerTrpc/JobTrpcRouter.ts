/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	router,
	procedure
} from "../../router";
import {JobSourceProcedure} from "@leight/job-server";

export const JobSourceRouter = router({
    create: procedure
                .input(JobSourceProcedure.CreateSchema)
                .mutation(JobSourceProcedure.handleCreate),
    patch:  procedure
                .input(JobSourceProcedure.PatchSchema)
                .mutation(JobSourceProcedure.handlePatch),
    upsert:  procedure
                .input(JobSourceProcedure.UpsertSchema)
                .mutation(JobSourceProcedure.handleUpsert),
    delete:  procedure
                .input(JobSourceProcedure.DeleteSchema)
                .mutation(JobSourceProcedure.handleDelete),
    deleteWith:  procedure
                .input(JobSourceProcedure.DeleteWithSchema)
                .mutation(JobSourceProcedure.handleDeleteWith),
    query:  procedure
                .input(JobSourceProcedure.QuerySchema)
                .query(JobSourceProcedure.handleQuery),
    count:  procedure
                .input(JobSourceProcedure.CountSchema)
                .query(JobSourceProcedure.handleCount),
    fetch:  procedure
                .input(JobSourceProcedure.FetchSchema)
                .query(JobSourceProcedure.handleFetch),
    fetchOptional:  procedure
                .input(JobSourceProcedure.FetchSchema)
                .query(JobSourceProcedure.handleFetchOptional),
    find:   procedure
                .input(JobSourceProcedure.FindSchema)
                .query(JobSourceProcedure.handleFind),
    findOptional:   procedure
                .input(JobSourceProcedure.FindOptionalSchema)
                .query(JobSourceProcedure.handleFindOptional),
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_n6bhrhob6ke1qvf56m7p06nz = true;