import { IContext } from "@leight/trpc";
import { TRPCError } from "@trpc/server";
import { ZodType } from "zod";

export interface IHandlerRequest<TRequest> {
    ctx: IContext;
    input: TRequest;
}

export type IHandlerCallback<TRequest, TResponse> = (
    props: IHandlerProps<TRequest>
) => Promise<TResponse>;

export interface IHandlerProps<TRequest> extends IContext {
    request: TRequest;
}

export interface IWithHandlerProps<TRequest, TResponse> {
    request: TRequest;
    handler: IHandlerCallback<TRequest, TResponse>;
    withTokens?: string[];
    defaultErrorMessage?: string;
    defaultErrorCode?: TRPCError["code"];

    onError?(e: Error): Promise<void>;
}

/**
 * Utility function making a clever bridge for handling tRPC calls.
 */
export const withHandler = <TRequest extends ZodType, TResponse>({
    request,
    handler,
    withTokens = ["user"],
    defaultErrorMessage = "Unhandled kaboom",
    defaultErrorCode = "INTERNAL_SERVER_ERROR",
    onError = (e) => {
        throw e;
    },
}: IWithHandlerProps<TRequest, TResponse>): ((
    props: IHandlerRequest<string>
) => Promise<TResponse>) => {
    return async ({ ctx, input }) => {
        ctx.checkAny(withTokens);
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
