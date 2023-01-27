import { TRPCError } from "@trpc/server";
import { withMutationProcedure } from "@leight/trpc-server";
import { RequestSchema } from "@leight/xlsx-import";
import { ImportServiceContext } from "../context";

export const XlsxImportProcedure = withMutationProcedure(
    RequestSchema,
    async ({ checkAny, container, request }) => {
        checkAny(["user"]);
        try {
            return await ImportServiceContext(container)
                .resolve()
                .async(request);
        } catch (e) {
            throw new TRPCError({
                message: "Could not start an import job. Yaaykes!",
                code: "INTERNAL_SERVER_ERROR",
            });
        }
    }
);
