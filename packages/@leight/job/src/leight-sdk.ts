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
                entity: {
                    type:        "JobSchemaOverride",
                    withPackage: {
                        package: "../schema",
                    },
                }
            }
        })
    )
);
