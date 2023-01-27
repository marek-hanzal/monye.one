import { ImportServiceContext } from "@leight/xlsx-import-server";
import { z, ZodType } from "zod";
import { TRPCError } from "@trpc/server";
import {
    DefaultValue as FallbackValue,
    ResolveOptions,
} from "@trpc/server/src/core/internals/utils";
import { MaybePromise } from "@trpc/server/src/types";
import { ProcedureBuilder } from "@trpc/server/src/core/internals/procedureBuilder";
import { procedure, router } from "../../router";

type InferProcedureParams<T> = T extends ProcedureBuilder<infer U> ? U : T;

export const withMutation = <
    TProcedure extends ProcedureBuilder<any>,
    TRequest extends ZodType,
    TResponse
>(
    request: TRequest,
    callback: (
        opts: ResolveOptions<InferProcedureParams<TProcedure>>
    ) => MaybePromise<
        FallbackValue<InferProcedureParams<TProcedure>["_output_in"], TResponse>
    >
) => {
    return procedure.input(request).mutation(callback);
};

export const XlsxRouter = router({
    // job: XlsxImportProcedure(procedure),
    job: withMutation(
        z.object({
            fileId: z.string(),
        }),
        async ({ ctx: { container }, input: request }) => {
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
        }
    ),
});
