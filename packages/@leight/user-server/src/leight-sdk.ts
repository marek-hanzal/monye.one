import {
    withSdk,
    withServerSourceGenerators
} from "@leight/sdk";

void withSdk(
    withServerSourceGenerators({
        PrismaSource: {
            entities: [
                {
                    name:     "User",
                    packages: {
                        schema: "@leight/user",
                        prisma: "@leight/prisma",
                    },
                    prisma:   "user",
                },
            ],
        },
        Source:       {
            entities: [
                {
                    name:     "User",
                    packages: {
                        schema: "@leight/user",
                    },
                    sourceEx: {
                        type:        "UserSourceEx",
                        withPackage: {
                            package: "../../source",
                        },
                    },
                },
            ],
        },
    })
);
