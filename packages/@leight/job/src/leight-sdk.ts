import {
    withSdk,
    withSourceGenerators
} from "@leight/sdk";

void withSdk(
    withSourceGenerators({
        PrismaSource: {
            entities: [
                {
                    name:         "Job",
                    packages:     {
                        prisma: "@leight/prisma",
                    },
                    sorts:        [
                        "started",
                    ],
                    withSchemaEx: {
                        schema: {
                            type:        "JobSchemaEx",
                            withPackage: {
                                package: "../../schema",
                            },
                        },
                    },
                },
            ],
        },
    })
);
