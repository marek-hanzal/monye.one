/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	router,
	procedure
} from "../../router";
import {FilterSourceProcedure} from "@leight/filter-server";

export const FilterSourceRouter = router({
    create: procedure
                .input(FilterSourceProcedure.CreateSchema)
                .mutation(FilterSourceProcedure.handleCreate),
    patch:  procedure
                .input(FilterSourceProcedure.PatchSchema)
                .mutation(FilterSourceProcedure.handlePatch),
    upsert:  procedure
                .input(FilterSourceProcedure.UpsertSchema)
                .mutation(FilterSourceProcedure.handleUpsert),
    delete:  procedure
                .input(FilterSourceProcedure.DeleteSchema)
                .mutation(FilterSourceProcedure.handleDelete),
    deleteWith:  procedure
                .input(FilterSourceProcedure.DeleteWithSchema)
                .mutation(FilterSourceProcedure.handleDeleteWith),
    query:  procedure
                .input(FilterSourceProcedure.QuerySchema)
                .query(FilterSourceProcedure.handleQuery),
    count:  procedure
                .input(FilterSourceProcedure.CountSchema)
                .query(FilterSourceProcedure.handleCount),
    fetch:  procedure
                .input(FilterSourceProcedure.FetchSchema)
                .query(FilterSourceProcedure.handleFetch),
    fetchOptional:  procedure
                .input(FilterSourceProcedure.FetchSchema)
                .query(FilterSourceProcedure.handleFetchOptional),
    find:   procedure
                .input(FilterSourceProcedure.FindSchema)
                .query(FilterSourceProcedure.handleFind),
    findOptional:   procedure
                .input(FilterSourceProcedure.FindOptionalSchema)
                .query(FilterSourceProcedure.handleFindOptional),
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_fn4sl4qj8yf2i3pqb5gc0b4w = true;