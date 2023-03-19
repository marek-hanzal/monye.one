import {JobSourceProcedure} from "@leight/job-server";
import {
    procedure,
    router
}                           from "../../router";

export const SourceRouter = router({
    query: procedure
               .input(JobSourceProcedure.QueryOptionalSchema)
               .query(JobSourceProcedure.Query),
    count: procedure
               .input(JobSourceProcedure.QueryOptionalSchema)
               .query(JobSourceProcedure.QueryCount),
    fetch: procedure
               .input(JobSourceProcedure.QuerySchema)
               .query(JobSourceProcedure.Fetch),
    find:  procedure
               .input(JobSourceProcedure.IdentitySchema)
               .query(JobSourceProcedure.Find),
});
