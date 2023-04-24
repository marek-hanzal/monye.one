import {
    withSdk,
    withServerSourceGenerators
} from "@leight/sdk";

void withSdk(
    withServerSourceGenerators({
        PrismaSource: {
            entities: [
                {
                    name:     "Keyword",
                    packages: {
                        schema: "@leight/keyword",
                        prisma: "@leight/prisma",
                    },
                    prisma:   "keyword",
                },
            ],
        },
        Source:       {
            entities: [
                {
                    name:     "Keyword",
                    packages: {
                        schema: "@leight/keyword",
                    },
                    sourceEx: {
                        type:        "KeywordSourceEx",
                        withPackage: {
                            package: "../../source",
                        },
                    },
                },
            ],
        },
    })
);
