import { IContext } from "@leight/trpc";
import { TRPCError } from "@trpc/server";
import { TokenError } from "@leight/user";

export interface IHandlerRequest<TRequest> {
    ctx: IContext;
    input: TRequest;
}

export interface IHandlerProps<TRequest> extends IContext {
    request: TRequest;
}

export type IHandlerCallback<TRequest, TResponse> = (
    props: IHandlerProps<TRequest>
) => Promise<TResponse>;

export interface IWithHandlerProps<TRequest, TResponse> {
    handler: IHandlerCallback<TRequest, TResponse>;
    withTokens?: string[];
    defaultErrorMessage?: string;
    defaultErrorCode?: TRPCError["code"];

    onError?(e: Error): Promise<void>;
}

/**
 * Utility function making a clever bridge for handling tRPC calls.
 */
export const withHandler = <TRequest, TResponse>({
    handler,
    withTokens = ["user"],
    defaultErrorMessage = "Unhandled kaboom",
    defaultErrorCode = "INTERNAL_SERVER_ERROR",
    onError = (e) => {
        throw e;
    },
}: IWithHandlerProps<TRequest, TResponse>) => {
    return async ({
        ctx,
        input,
    }: IHandlerRequest<TRequest>): Promise<TResponse> => {
        try {
            ctx.checkAny(withTokens);
        } catch (e) {
            if (e instanceof TokenError) {
                throw new TRPCError({
                    message: "Token: Unauthorized :(",
                    code: "UNAUTHORIZED",
                });
            }
            throw new TRPCError({
                message: "Token: General kaboom :'(",
                code: "INTERNAL_SERVER_ERROR",
            });
        }
        try {
            return await handler({
                ...ctx,
                request: input,
            });
        } catch (e) {
            if (e instanceof Error) {
                await onError(e);
            }
            throw new TRPCError({
                message: defaultErrorMessage,
                code: defaultErrorCode,
            });
        }
    };
};
