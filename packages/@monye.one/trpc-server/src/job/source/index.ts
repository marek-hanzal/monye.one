import {JobSourceProcedure} from "@leight/job-server";
import {
    procedure,
    router
}                           from "../../router";

/**
 * @TODO GENERATE THIS !
 */

export const SourceRouter = router({
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
