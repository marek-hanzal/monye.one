import {type IContainer}                from "@leight/container";
import {
    $PrismaClient,
    type PrismaClient
}                                       from "@leight/prisma";
import {
    $RegistrationService,
    $UserJwtService,
    type IRegistrationService,
    type IUserJwtService
}                                       from "@leight/user";
import {Logger}                         from "@leight/winston";
import {PrismaAdapter}                  from "@next-auth/prisma-adapter";
import NextAuthShit, {type AuthOptions} from "next-auth";
import {type Provider}                  from "next-auth/providers";

export interface INextAuthEndpointProps {
    options?: Partial<AuthOptions>;
    providers: (Provider | null | false | undefined)[];
    container: IContainer;
}

export const NextAuthEndpoint = ({options, providers, container}: INextAuthEndpointProps) => {
    const registrationService = container.resolve<IRegistrationService>($RegistrationService);
    const userJwtService      = container.resolve<IUserJwtService>($UserJwtService);
    const logger              = Logger("auth");
    /**
     * For whatever reason, types are not what you really get, so the hack must be used.
     */
    const NextAuth            = (NextAuthShit as any).default as typeof NextAuthShit;

    return NextAuth({
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
        adapter:   PrismaAdapter(container.resolve<PrismaClient>($PrismaClient)),
        session:   {
            strategy: "jwt",
        },
        providers: providers.filter((provider): provider is Provider => !!provider),
        callbacks: {
            jwt: async (token) => {
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
            session: async ({session, token}) => {
                const $session = {...session};
                if ($session && token?.sub) {
                    $session.user = {
                        userId: token.sub,
                        tokens: token.tokens,
                        ...session.user,
                    };
                }
                return $session;
            },
        },
        ...options,
    });
};
