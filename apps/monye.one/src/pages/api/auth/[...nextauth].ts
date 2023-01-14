import {env}               from "@/monye.one/env/server.mjs";
import {container}         from "@/monye.one/server/container";
import {Logger}            from "@leight/winston";
import {
    RegistrationService,
    UserJwtService
}                          from "@monye.one/user-server";
import {PrismaAdapter}     from "@next-auth/prisma-adapter";
import {PrismaClient}      from "@prisma/client";
import NextAuth            from "next-auth";
import type {Provider}     from "next-auth/providers";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHub              from "next-auth/providers/github";

const logger              = Logger("auth");
const prisma              = container.resolve(PrismaClient);
const registrationService = container.resolve(RegistrationService);
const userJwtService      = container.resolve(UserJwtService);

const providers: Provider[] = [
    GitHub({
        name:         "github",
        clientId:     env.NEXTAUTH_GITHUB_CLIENT_ID,
        clientSecret: env.NEXTAUTH_GITHUB_CLIENT_SECRET,
    }),
    // Google({
    //     name:         "google",
    //     clientId:     env.NEXTAUTH_GOOGLE_CLIENT_ID,
    //     clientSecret: env.NEXTAUTH_GOOGLE_CLIENT_SECRET,
    // }),
];

if (env.NODE_ENV === "development") {
    providers.push(CredentialsProvider({
        name:        "Credentials",
        credentials: {
            secret: {label: "Dark Secret", type: "text"},
        },
        async authorize(credentials) {
            const {secret} = credentials || {};
            if (!secret) {
                return null;
            }
            return prisma.user.findUnique({
                where: {
                    email: secret,
                }
            });
        }
    }));
}

export default NextAuth({
    theme:     {
        logo:        "/logo.png",
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
    adapter:   PrismaAdapter(prisma),
    session:   {
        strategy: "jwt",
    },
    providers,
    callbacks: {
        jwt:     async token => {
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
});
