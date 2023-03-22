import {
    generatorQuerySchema,
    withSdk
} from "@leight/sdk";

void withSdk([
    async () => generatorQuerySchema({
        name:   "query-schema",
        file:   "src/sdk/query-schema.ts",
        params: {
            prismaPackage: "@monye.one/prisma",
            modelName:     "Transaction",
        },
    }),
]);
