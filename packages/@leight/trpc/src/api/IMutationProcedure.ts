import { BuildProcedure, ProcedureBuilder } from "@trpc/server";

export type IMutationProcedure<
    TProcedureBuilder extends ProcedureBuilder<any>,
    TReturnType
> = (
    procedure: TProcedureBuilder
) => BuildProcedure<"mutation", any, TReturnType>;
