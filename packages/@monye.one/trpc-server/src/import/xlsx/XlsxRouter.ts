import { XlsxImportProcedure } from "@leight/xlsx-import-server";
import { publicProcedure, router } from "../../router";

export const XlsxRouter = router({
    job: XlsxImportProcedure.factory(publicProcedure),
});
