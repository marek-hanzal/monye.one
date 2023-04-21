import {ImportParamsSchema}  from "@leight/import";
import {XlsxImportProcedure} from "@leight/xlsx-import-server";
import {
    procedure,
    router
}                            from "../../router";

export const XlsxRouter = router({
    job: procedure.input(ImportParamsSchema).mutation(XlsxImportProcedure),
});
