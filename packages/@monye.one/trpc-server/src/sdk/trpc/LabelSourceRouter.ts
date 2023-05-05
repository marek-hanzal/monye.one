/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	router,
	procedure
} from "../../router";
import {LabelRepositoryHandler} from "@leight/label-server";

export const LabelRepositoryRouter = router({
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
    deleteBy:  procedure
                .input(LabelSourceProcedure.DeleteBySchema)
                .mutation(LabelSourceProcedure.handleDeleteBy),
    query:  procedure
                .input(LabelSourceProcedure.QuerySchema)
                .query(LabelSourceProcedure.handleQuery),
    count:  procedure
                .input(LabelSourceProcedure.CountSchema)
                .query(LabelSourceProcedure.handleCount),
    fetch:  procedure
                .input(LabelSourceProcedure.FetchSchema)
                .query(LabelSourceProcedure.handleFetch),
    fetch$:  procedure
                .input(LabelSourceProcedure.Fetch$Schema)
                .query(LabelSourceProcedure.handleFetchOptional),
    get:   procedure
                .input(WithIdentitySchema)
                .query(LabelSourceProcedure.handleGet),
    get$:   procedure
                .input(WithIdentitySchema)
                .query(LabelSourceProcedure.handleFindOptional),
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_nyog6e4038qf5nxf37q2at37 = true;