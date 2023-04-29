import {
    type UseMutationOptions,
    type UseMutationResult,
    type UseQueryOptions,
    type UseQueryResult
} from "@tanstack/react-query";

export type IUseQueryResult<TResponse> = UseQueryResult<TResponse>;
export type IUseMutationResult<TRequest, TResponse> = UseMutationResult<TResponse, any, TRequest>;

export type IUseQuery<
    TRequest,
    TResponse,
> = (request: TRequest, options?: UseQueryOptions<any, any, TResponse, any>) => IUseQueryResult<TResponse>;

export type IUseMutation<
    TRequest,
    TResponse,
> = (options?: UseMutationOptions<TResponse, any, TRequest>) => IUseMutationResult<TRequest, TResponse>;
