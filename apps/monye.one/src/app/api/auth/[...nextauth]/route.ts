import {container}          from "@/monye.one/container";
import {env}                from "@/monye.one/env.mjs";
import {NextAuthEndpoint}   from "@leight/auth-server";
import {withUserRepository} from "@leight/user-server";
import CredentialsProvider  from "next-auth/providers/credentials";
import GitHub               from "next-auth/providers/github";

export const {
    GET,
    POST
} = NextAuthEndpoint({
    container,
    providers: [
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
        env.NODE_ENV === "development" && CredentialsProvider({
            name:        "Credentials",
            credentials: {
                secret: {
                    label: "Dark Secret",
                    type:  "text"
                },
            },
            async authorize(credentials) {
                const {secret} = credentials || {};
                if (!secret) {
                    return null;
                }
                return withUserRepository(container).findByEmail(secret);
            },
        }),
    ],
});
