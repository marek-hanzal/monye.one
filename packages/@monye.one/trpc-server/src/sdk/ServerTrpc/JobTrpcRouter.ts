/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {WithIdentitySchema} from "@leight/source";
import {
	router,
	procedure
} from "../../router";
import {JobSourceSchema} from "@leight/job";
import {JobSourceProcedure} from "@leight/job-server";

export const JobSourceRouter = router({
    create: procedure
                .input(JobSourceSchema.ToCreateSchema)
                .mutation(JobSourceProcedure.handleCreate),
    patch:  procedure
                .input(JobSourceSchema.ToPatchSchema)
                .mutation(JobSourceProcedure.handlePatch),
    delete:  procedure
                .input(WithIdentitySchema)
                .mutation(JobSourceProcedure.handleDelete),
    deleteWith:  procedure
                .input(JobSourceSchema.QuerySchema)
                .mutation(JobSourceProcedure.handleDeleteWith),
    query:  procedure
                .input(JobSourceSchema.QueryOptionalSchema)
                .query(JobSourceProcedure.handleQuery),
    count:  procedure
                .input(JobSourceSchema.QueryOptionalSchema)
                .query(JobSourceProcedure.handleCount),
    fetch:  procedure
                .input(JobSourceSchema.QuerySchema)
                .query(JobSourceProcedure.handleFetch),
    find:   procedure
                .input(WithIdentitySchema)
                .query(JobSourceProcedure.handleFind),
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_s64q9gkczlmjcdkmjhxdpc0r = true;