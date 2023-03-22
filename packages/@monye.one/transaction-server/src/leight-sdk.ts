import {
    withSdk,
    withServerSourceGenerators
} from "@leight/sdk";

void withSdk(withServerSourceGenerators({
    modelName:     "Transaction",
    schemaPackage: "@monye.one/transaction",
    prismaPackage: "@monye.one/prisma",
    prismaModel:   "transaction",
}));
