import {
    type UseMutationOptions,
    type UseMutationResult,
    type UseQueryOptions,
    type UseQueryResult
} from "@tanstack/react-query";

export type IUseQuery<
    TRequest,
    TResponse,
> = (request: TRequest, options?: UseQueryOptions<any, any, TResponse, any>) => UseQueryResult<TResponse>;

export type IUseMutation<
    TRequest,
    TResponse,
> = (options?: UseMutationOptions<TResponse, any, TRequest>) => UseMutationResult<TResponse, any, TRequest>;
