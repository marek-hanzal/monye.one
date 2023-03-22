import {
    withSdk,
    withSourceGenerators
} from "@leight/sdk";

void withSdk(withSourceGenerators({
    modelName:    "Job",
    PrismaSchema: "@leight/prisma",
    sorts:        [
        "started",
    ],
    schemaEx:     {
        model: {
            type:    "JobSchemaOverride",
            package: "../schema",
        }
    }
}));
