import {type IContainer} from "@leight/container";
import {
    withTokenService,
    withUserService,
}                        from "@leight/user";
import {
    registerTokenService,
    registerUserId
}                        from "@leight/user-server";
import {type AnyRouter}  from "@trpc/server";
import {getToken}        from "next-auth/jwt";
import {createHandler}   from "./createHandler";

export const TrpcEndpoint = <TRouter extends AnyRouter>(
    router: TRouter,
    coolContainer: IContainer
) =>
    createHandler(router, async ({req}) => {
        const container = coolContainer.child();
        const token = await getToken({req});
        registerTokenService(container, token?.tokens);
        registerUserId(container, token?.sub);
        const tokenService = withTokenService(container);
        return {
            container,
            userService: withUserService(container),
            tokenService,
            checkAny:    tokens => tokenService.checkAny(tokens),
        };
    });
