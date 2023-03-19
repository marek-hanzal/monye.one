import {type UseMutationResult} from "@tanstack/react-query";

export interface IWithTrpcMutation<TRequest, TResponse> {
    useMutation: () => UseMutationResult<TResponse, unknown, TRequest>;
}
