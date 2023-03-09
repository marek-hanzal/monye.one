import {RequestSchema}       from "@leight/xlsx-import";
import {XlsxImportProcedure} from "@leight/xlsx-import-server";
import {
    procedure,
    router
}                            from "../../router";

export const XlsxRouter = router({
    job: procedure.input(RequestSchema).mutation(XlsxImportProcedure),
});
