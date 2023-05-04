/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	router,
	procedure
} from "../../router";
import {LabelSourceProcedure} from "@leight/label-server";

export const LabelSourceRouter = router({
    create: procedure
                .input(LabelSourceProcedure.CreateSchema)
                .mutation(LabelSourceProcedure.handleCreate),
    patch:  procedure
                .input(LabelSourceProcedure.PatchSchema)
                .mutation(LabelSourceProcedure.handlePatch),
    patchBy:  procedure
                .input(LabelSourceProcedure.PatchBySchema)
                .mutation(LabelSourceProcedure.handlePatchBy),
    upsert:  procedure
                .input(LabelSourceProcedure.UpsertSchema)
                .mutation(LabelSourceProcedure.handleUpsert),
    delete:  procedure
                .input(LabelSourceProcedure.DeleteSchema)
                .mutation(LabelSourceProcedure.handleDelete),
    deleteWith:  procedure
                .input(LabelSourceProcedure.DeleteWithSchema)
                .mutation(LabelSourceProcedure.handleDeleteWith),
    query:  procedure
                .input(LabelSourceProcedure.QuerySchema)
                .query(LabelSourceProcedure.handleQuery),
    count:  procedure
                .input(LabelSourceProcedure.CountSchema)
                .query(LabelSourceProcedure.handleCount),
    fetch:  procedure
                .input(LabelSourceProcedure.FetchSchema)
                .query(LabelSourceProcedure.handleFetch),
    fetchOptional:  procedure
                .input(LabelSourceProcedure.FetchSchema)
                .query(LabelSourceProcedure.handleFetchOptional),
    find:   procedure
                .input(LabelSourceProcedure.FindSchema)
                .query(LabelSourceProcedure.handleFind),
    findOptional:   procedure
                .input(LabelSourceProcedure.FindOptionalSchema)
                .query(LabelSourceProcedure.handleFindOptional),
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_y0mzely9z4esta4j1gcd7xnt = true;