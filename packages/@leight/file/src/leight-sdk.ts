import {
    withSdk,
    withSourceGenerators
} from "@leight/sdk";

void withSdk(withSourceGenerators({
    modelName:    "File",
    PrismaSchema: "@leight/prisma",
}));
