import { withEnv } from "@leight/env";
import { z } from "zod";

export const {env} = withEnv({
    serverSchema: z.object({
        NEXTAUTH_GITHUB_CLIENT_ID:     z.string().min(1),
        NEXTAUTH_GITHUB_CLIENT_SECRET: z.string().min(1),
        NEXTAUTH_GOOGLE_CLIENT_ID:     z.string().min(1).optional(),
        NEXTAUTH_GOOGLE_CLIENT_SECRET: z.string().min(1).optional(),
    }),
    processEnv:   {
        NEXTAUTH_GITHUB_CLIENT_ID:     process.env.NEXTAUTH_GITHUB_CLIENT_ID,
        NEXTAUTH_GITHUB_CLIENT_SECRET: process.env.NEXTAUTH_GITHUB_CLIENT_SECRET,
        NEXTAUTH_GOOGLE_CLIENT_ID:     process.env.NEXTAUTH_GOOGLE_CLIENT_ID,
        NEXTAUTH_GOOGLE_CLIENT_SECRET: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET,
    },
});
