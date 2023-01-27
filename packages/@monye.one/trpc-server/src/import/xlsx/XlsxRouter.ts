import { XlsxImportProcedure } from "@leight/xlsx-import-server";
import { procedure, router } from "../../router";

export const XlsxRouter = router({
    /**
     * TRY TO USE PROCEDURE DIRECTLY
     */

    job: XlsxImportProcedure(procedure),
});
