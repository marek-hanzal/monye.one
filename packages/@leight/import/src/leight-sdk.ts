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
            withPrismaSchemaEx: {
                schema: {
                    type:        "JobSchemaEx",
                    withPackage: {
                        package: "../../schema",
                    },
                },
                dto: {
                    type:        "JobDtoEx",
                    withPackage: {
                        package: "../../schema",
                    },
                },
            },
        })
    )
);
