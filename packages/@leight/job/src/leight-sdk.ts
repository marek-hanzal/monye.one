import {
    withSdk,
    withSourceGenerators,
    withSourceGeneratorsEntity
} from "@leight/sdk";

void withSdk(
    withSourceGenerators(
        withSourceGeneratorsEntity({
            name:               "Job",
            packages:           {
                prisma: "@leight/prisma",
            },
            sorts:              [
                "started",
            ],
            withPrismaSchemaEx: {
                schema: {
                    type:        "JobSchemaEx",
                    withPackage: {
                        package: "../schema",
                    },
                }
            }
        })
    )
);
