import {type IContainer} from "@leight/container";
import {withLogger}      from "@leight/logger-server";
import {
    withRegistrationService,
    withUserJwtService
}                        from "@leight/user";
import {
    type AuthOptions,
    type NextAuthOptions,
    type Session
}                        from "next-auth";
import {Provider}        from "next-auth/providers";

export interface IWithAuthProps {
    options?: Partial<AuthOptions>;
    providers: (Provider | null | false | undefined)[];
    container: IContainer;
}

export const withAuth = (
    {
        options,
        providers,
        container,
    }: IWithAuthProps): NextAuthOptions => {
    const logger = withLogger("auth");
    const registrationService = withRegistrationService(container);
    const userJwtService = withUserJwtService(container);
    return {
        theme:     {
            logo:        "/assets/logo/logo.svg",
            brandColor:  "#1890ff",
            colorScheme: "light",
        },
        events:    {
            signIn:  ({user}) => {
                logger.debug("User sign-in", {label: {userId: user.id}});
            },
            signOut: ({token: {sub}}) => {
                logger.debug("User sign-out", {label: {userId: sub}});
            },
        },
        // adapter:   PrismaAdapter(withPrismaClient(container)),
        session:   {
            strategy: "jwt",
        },
        providers: providers.filter(Boolean),
        callbacks: {
            jwt:     async (token) => {
                try {
                    await registrationService.handle(token);
                    return await userJwtService.token(token.token);
                } catch (e) {
                    if (e instanceof Error) {
                        logger.error(e.message);
                        logger.error(e.stack);
                    }
                    throw e;
                }
            },
            session: async (
                {
                    session,
                    token
                }) => {
                const $session: any = {...session};
                if ($session && token?.sub) {
                    $session.user = {
                        userId: token.sub,
                        tokens: token.tokens,
                        ...session.user,
                    };
                }
                return $session as Session;
            },
        },
        ...options,
    };
};
