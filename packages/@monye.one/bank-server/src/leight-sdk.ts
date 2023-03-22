import {
    withSdk,
    withServerSourceGenerators
} from "@leight/sdk";

void withSdk(withServerSourceGenerators({
    modelName:     "Bank",
    schemaPackage: "@monye.one/bank",
    prismaPackage: "@monye.one/prisma",
    prismaModel:   "bank",
}));
