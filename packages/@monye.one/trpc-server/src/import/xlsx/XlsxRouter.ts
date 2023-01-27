import { ImportServiceContext } from "@leight/xlsx-import-server";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { procedure, router } from "../../router";

export const XlsxRouter = router({
    /**
     * TRY TO USE PROCEDURE DIRECTLY
     */

    // job: XlsxImportProcedure(procedure),
    job: procedure
        .input(
            z.object({
                fileId: z.string(),
            })
        )
        .mutation(async ({ ctx: { container }, input: request }) => {
            try {
                // eslint-disable-next-line @typescript-eslint/return-await
                return await ImportServiceContext(container)
                    .resolve()
                    .async(request);
            } catch (e) {
                throw new TRPCError({
                    message: "Could not start an import job. Yaaykes!",
                    code: "INTERNAL_SERVER_ERROR",
                });
            }
        }),
});
