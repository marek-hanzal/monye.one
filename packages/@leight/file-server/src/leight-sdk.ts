import {
    withSdk,
    withServerSourceGenerators
} from "@leight/sdk";

void withSdk(withServerSourceGenerators({
    modelName:     "File",
    schemaPackage: "@leight/file",
    prismaPackage: "@leight/prisma",
    prismaModel:   "file",
}));
