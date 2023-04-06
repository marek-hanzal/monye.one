import {CalendarEventSourceProcedure} from "@monye.one/book-server";
import {
    procedure,
    router
}                                     from "../../../../router";

export const SourceRouter = router({
    query: procedure
               .input(CalendarEventSourceProcedure.QueryOptionalSchema)
               .query(CalendarEventSourceProcedure.Query),
    count: procedure
               .input(CalendarEventSourceProcedure.QueryOptionalSchema)
               .query(CalendarEventSourceProcedure.QueryCount),
    fetch: procedure
               .input(CalendarEventSourceProcedure.QuerySchema)
               .query(CalendarEventSourceProcedure.Fetch),
    find:  procedure
               .input(CalendarEventSourceProcedure.IdentitySchema)
               .query(CalendarEventSourceProcedure.Find),
});
