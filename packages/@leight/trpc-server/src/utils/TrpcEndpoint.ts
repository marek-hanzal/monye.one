import {getToken} from "next-auth/jwt";
import {TokenServiceContext, UserIdContext, UserServiceContext,} from "@leight/user-server";
import {childContainer, type IContainer} from "@leight/container";
import {AnyRouter} from "@trpc/server";
import {createHandler} from "./createHandler";

export const TrpcEndpoint = <TRouter extends AnyRouter>(
    router: TRouter,
    coolContainer: IContainer
) =>
    createHandler(router, async ({req}) => {
        const container = childContainer(coolContainer);
        const token = await getToken({req});
        const tokenService = TokenServiceContext(container)
            .register((token?.tokens || []) as [])
            .resolve();
        UserIdContext(container).register(token?.sub);
        return {
            container,
            userService: UserServiceContext(container).resolve(),
            tokenService,
            checkAny: (tokens) => tokenService.checkAny(tokens),
        };
    });
