import { type ProcedureBuilder } from "@trpc/server";
import { type ZodType } from "zod";
import { type IMutationProcedure, type ITrpcCallback } from "@leight/trpc";

export const withMutationProcedure = <
    TProcedureBuilder extends ProcedureBuilder<any>,
    TZodType extends ZodType,
    TReturnType
>(
    input: TZodType,
    callback: ITrpcCallback<TZodType, TReturnType>
): IMutationProcedure<TProcedureBuilder, TReturnType> => {
    return (procedure) =>
        procedure.input(input).mutation<TReturnType>(callback);
};
