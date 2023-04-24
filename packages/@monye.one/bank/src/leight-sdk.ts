import {
    withSdk,
    withSourceGenerators
} from "@leight/sdk";

void withSdk(
    withSourceGenerators({
        PrismaSource: {
            entities: [
                {
                    name:         "Bank",
                    packages:     {
                        prisma: "@monye.one/prisma",
                    },
                    withSchemaEx: {
                        toCreate: {
                            type:        "BankToCreateSchemaEx",
                            withPackage: {
                                package: "../../schema",
                            }
                        },
                        toPatch:  {
                            type:        "BankToPatchSchemaEx",
                            withPackage: {
                                package: "../../schema",
                            }
                        },
                        dto:      {
                            type:        "BankSchemaEx",
                            withPackage: {
                                package: "../../schema",
                            },
                        },
                        filter:   {
                            type:        "BankFilterSchemaEx",
                            withPackage: {
                                package: "../../schema",
                            },
                        },
                    },
                    sorts:        [
                        "account",
                    ],
                },
            ],
        },
    })
);
