import { getToken } from "next-auth/jwt";
import {
    TokenServiceContext,
    UserIdContext,
    UserServiceContext,
} from "@leight/user-server";
import { TokenError } from "@leight/user";
import { container } from "tsyringe";
import { AnyRouter, TRPCError } from "@trpc/server";
import { createHandler } from "./createHandler";

export const TrpcEndpoint = <TRouter extends AnyRouter>(
    router: TRouter,
    coolContainer: typeof container
) =>
    createHandler(router, async ({ req }) => {
        const container = coolContainer.createChildContainer();
        const token = await getToken({ req });
        const tokenService = TokenServiceContext(container)
            .register((token?.tokens || []) as [])
            .resolve();
        UserIdContext(container).register(token?.sub);
        return {
            container,
            userService: UserServiceContext(container).resolve(),
            tokenService,
            checkAny: (tokens) => {
                try {
                    tokenService.checkAny(tokens);
                } catch (e) {
                    if (e instanceof TokenError) {
                        throw new TRPCError({
                            message: "Token: Unauthorized :(",
                            code: "UNAUTHORIZED",
                        });
                    }
                    throw new TRPCError({
                        message: "General kaboom :'(",
                        code: "INTERNAL_SERVER_ERROR",
                    });
                }
            },
        };
    });
