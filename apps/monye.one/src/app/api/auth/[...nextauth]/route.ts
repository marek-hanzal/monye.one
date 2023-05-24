import {env}               from "@/monye.one/env.mjs";
import {container}         from "@/monye.one/server/container";
import {NextAuthEndpoint}  from "@leight/viv-server";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHub              from "next-auth/providers/github";

export default NextAuthEndpoint({
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
                return UserRepositoryContext(container).resolve().findByEmail(secret);
            },
        }),
    ],
});
