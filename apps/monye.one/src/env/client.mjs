// @ts-check
import {
    clientEnv,
    clientSchema
} from "./schema.mjs";

const $clientEnv = clientSchema.safeParse(clientEnv);

export const formatErrors = (
    /** @type {import("zod").ZodFormattedError<Map<string,string>,string>} */
    errors,
) => {
    return Object.entries(errors)
        .map(([name, value]) => {
            if (value && "_errors" in value) {
                return `${name}: ${value._errors.join(", ")}\n`;
            }
            return false;
        })
        .filter(Boolean);
};

if (!$clientEnv.success) {
    console.error(
        "❌ Invalid environment variables:\n",
        ...formatErrors($clientEnv.error.format()),
    );
    throw new Error("Invalid environment variables");
}

Object.keys($clientEnv.data).forEach(key => {
    if (!key.startsWith("NEXT_PUBLIC_")) {
        console.warn(
            `❌ Invalid public environment variable name: ${key}. It must begin with 'NEXT_PUBLIC_'`,
        );

        throw new Error("Invalid public environment variable name");
    }
});

export const env = $clientEnv.data;
