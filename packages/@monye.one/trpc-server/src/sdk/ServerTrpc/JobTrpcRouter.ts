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
                .mutation(JobSourceProcedure.Create),
    patch:  procedure
                .input(JobSourceProcedure.PatchSchema)
                .mutation(JobSourceProcedure.Patch),
    query:  procedure
                .input(JobSourceProcedure.QueryOptionalSchema)
                .query(JobSourceProcedure.Query),
    count:  procedure
                .input(JobSourceProcedure.QueryOptionalSchema)
                .query(JobSourceProcedure.QueryCount),
    fetch:  procedure
                .input(JobSourceProcedure.QuerySchema)
                .query(JobSourceProcedure.Fetch),
    find:   procedure
                .input(JobSourceProcedure.IdentitySchema)
                .query(JobSourceProcedure.Find),
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_oksc5ni7yzf85casuumrs1cv = true;