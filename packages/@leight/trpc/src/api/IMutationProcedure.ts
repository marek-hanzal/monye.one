import {
    type BuildProcedure,
    type ProcedureBuilder,
    type ProcedureParams,
} from "@trpc/server";

export type IMutationProcedure<
    TRequest,
    TResponse,
    TParams extends ProcedureParams<
        any,
        any,
        TRequest,
        TRequest,
        TResponse,
        TResponse,
        any
    >
> = (
    procedure: ProcedureBuilder<TParams>
) => BuildProcedure<
    "mutation",
    ProcedureParams<any, any, any, any, TResponse, TResponse, any>,
    TResponse
>;
