import {
    withSdk,
    withServerSourceGenerators,
    withServerSourceGeneratorsEntity
} from "@leight/sdk";

void withSdk(
    withServerSourceGenerators(
        withServerSourceGeneratorsEntity({
            name:     "Job",
            packages: {
                schema: "@leight/job",
                prisma: "@leight/prisma",
            },
            prisma:   "job",
        })
    )
);
