import {
    childContainer,
    type IContainer
}                       from "@leight/container";
import {
    $UserService,
    type IUserService
}                       from "@leight/user";
import {
    TokenServiceContext,
    UserIdContext,
}                       from "@leight/user-server";
import {type AnyRouter} from "@trpc/server";
import {getToken}       from "next-auth/jwt";
import {createHandler}  from "./createHandler";

export const TrpcEndpoint = <TRouter extends AnyRouter>(
    router: TRouter,
    coolContainer: IContainer
) =>
    createHandler(router, async ({req}) => {
        const container    = childContainer(coolContainer);
        const token        = await getToken({req});
        const tokenService = TokenServiceContext(container)
            .register((token?.tokens || []) as [])
            .resolve();
        UserIdContext(container).register(token?.sub);
        return {
            container,
            userService: container.resolve<IUserService>($UserService),
            tokenService,
            checkAny:    (tokens) => tokenService.checkAny(tokens),
        };
    });
