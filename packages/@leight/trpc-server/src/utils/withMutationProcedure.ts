import { type ProcedureBuilder } from "@trpc/server";
import { type ZodType } from "zod";
import { type ITrpcCallback } from "@leight/trpc";

export const withMutationProcedure = <TRequest extends ZodType, TResponse>(
    input: TRequest,
    callback: ITrpcCallback<TRequest, TResponse>
) => {
    return (procedure: ProcedureBuilder<any>) =>
        procedure.input(input).mutation<TResponse>(callback);
};
