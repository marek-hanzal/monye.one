import {
    withSdk,
    withServerSourceGenerators
} from "@leight/sdk";

void withSdk(withServerSourceGenerators({
    modelName:     "Job",
    schemaPackage: "@leight/job",
    prismaPackage: "@leight/prisma",
    prismaModel:   "job",
}));
