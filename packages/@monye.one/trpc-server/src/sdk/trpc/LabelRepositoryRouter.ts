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
import {LabelSourceSchema} from "@leight/label";
import {LabelRepositoryHandler} from "@leight/label-server";

export const LabelRepositoryRouter = router({
    create: procedure
                .input(LabelSourceSchema.ToCreateSchema)
                .mutation(LabelRepositoryHandler.handleCreate),
    patch:  procedure
                .input(LabelSourceSchema.ToPatchSchemaProps)
                .mutation(LabelRepositoryHandler.handlePatch),
    patchBy:  procedure
                .input(LabelSourceSchema.ToPatchBySchemaProps)
                .mutation(LabelRepositoryHandler.handlePatchBy),
    upsert:  procedure
                .input(LabelSourceSchema.ToUpsertSchemaProps)
                .mutation(LabelRepositoryHandler.handleUpsert),
    delete:  procedure
                .input(LabelSourceSchema.DeleteSchema)
                .mutation(LabelRepositoryHandler.handleDelete),
    deleteBy:  procedure
                .input(LabelSourceSchema.DeleteBySchema)
                .mutation(LabelRepositoryHandler.handleDeleteBy),
    query:  procedure
                .input(LabelSourceSchema.QuerySchema)
                .query(LabelRepositoryHandler.handleQuery),
    count:  procedure
                .input(LabelSourceSchema.CountSchema)
                .query(LabelRepositoryHandler.handleCount),
    fetch:  procedure
                .input(LabelSourceSchema.FetchSchema)
                .query(LabelRepositoryHandler.handleFetch),
    fetch$:  procedure
                .input(LabelSourceSchema.Fetch$Schema)
                .query(LabelRepositoryHandler.handleFetch$),
    get:   procedure
                .input(WithIdentitySchema)
                .query(LabelRepositoryHandler.handleGet),
    get$:   procedure
                .input(WithIdentity$Schema)
                .query(LabelRepositoryHandler.handleGet$),
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_bwib48jopssoa8f7048iu3x6 = true;