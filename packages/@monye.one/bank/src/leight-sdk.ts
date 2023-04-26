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
        Form:         {
            forms: [
                {
                    name:   "BankCreate",
                    schema: {
                        values: {
                            type:        "BankCreateFormValueSchema",
                            withPackage: {
                                package: "../../schema"
                            },
                        },
                        request: {
                            type:        "BankCreateFormRequestSchema",
                            withPackage: {
                                package: "../../schema"
                            },
                        },
                        dto: {
                            type:        "BankCreateFormDtoSchema",
                            withPackage: {
                                package: "../../schema"
                            },
                        },
                    },
                },
                {
                    name:   "BankEdit",
                    schema: {
                        values: {
                            type:        "BankEditFormValueSchema",
                            withPackage: {
                                package: "../../schema"
                            },
                        },
                        request: {
                            type:        "BankEditFormRequestSchema",
                            withPackage: {
                                package: "../../schema"
                            },
                        },
                        dto: {
                            type:        "BankEditFormDtoSchema",
                            withPackage: {
                                package: "../../schema"
                            },
                        },
                    },
                },
                {
                    name:   "BankPatch",
                    schema: {
                        values: {
                            type:        "BankPatchFormValueSchema",
                            withPackage: {
                                package: "../../schema"
                            },
                        },
                        request: {
                            type:        "BankPatchFormRequestSchema",
                            withPackage: {
                                package: "../../schema"
                            },
                        },
                        dto: {
                            type:        "BankPatchFormDtoSchema",
                            withPackage: {
                                package: "../../schema"
                            },
                        },
                    },
                },
            ],
        }
    })
);
