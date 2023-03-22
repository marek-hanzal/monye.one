import {
    generatorSource,
    withSdk
} from "@leight/sdk";

void withSdk([
    async () => generatorSource({
        name:   "source",
        file:   "src/sdk/source.ts",
        barrel: true,
        params: {
            prismaPackage: "@monye.one/prisma",
            modelName:     "Transaction",
        },
    }),
]);
