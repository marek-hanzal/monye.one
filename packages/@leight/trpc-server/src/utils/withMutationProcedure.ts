import { type ProcedureBuilder, ProcedureParams } from "@trpc/server";
import { type ZodType } from "zod";
import { type IContext, type ITrpcCallback } from "@leight/trpc";

export const withMutationProcedure = <
    TRequest extends ZodType,
    TContext extends IContext,
    TResponse
>(
    input: TRequest,
    callback: ITrpcCallback<TRequest, TResponse>
) => {
    return (
        procedure: ProcedureBuilder<
            ProcedureParams<any, TContext, any, any, any, any, any>
        >
    ) =>
        procedure
            .input(input)
            .mutation<TResponse>(({ ctx, input }) =>
                callback({ ...ctx, request: input })
            );
};
