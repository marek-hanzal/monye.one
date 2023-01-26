import { type ProcedureBuilder } from "@trpc/server";
import { type ZodType } from "zod";
import { type ITrpcCallback } from "./ITrpcCallback";

export const withMutationProcedure = <
    TProcedureBuilder extends ProcedureBuilder<any>,
    TZodType extends ZodType,
    TReturnType
>(
    input: TZodType,
    callback: ITrpcCallback<TZodType, TReturnType>
) => {
    return (procedure: TProcedureBuilder) =>
        procedure.input(input).mutation(callback);
};
