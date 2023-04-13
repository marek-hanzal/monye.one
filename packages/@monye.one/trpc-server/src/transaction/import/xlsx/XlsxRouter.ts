import {XlsxImportProcedure}           from "@leight/xlsx-import-server";
import {TransactionImportParamsSchema} from "@monye.one/transaction";
import {
    procedure,
    router
}                                      from "../../../router";

export const XlsxRouter = router({
    job: procedure.input(TransactionImportParamsSchema).mutation(XlsxImportProcedure),
});
