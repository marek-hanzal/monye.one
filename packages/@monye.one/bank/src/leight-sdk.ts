import {
    withSdk,
    withSourceGenerators
} from "@leight/sdk";

void withSdk(
    withSourceGenerators({
        PrismaSource: {
            entities: [
                {
                    name:     "Bank",
                    packages: {
                        prisma: "@monye.one/prisma",
                    },
                },
            ],
        },
        Form:         {
            forms: [
                {
                    name: "BankCreate",
                },
                {
                    name: "BankEdit",
                },
                {
                    name: "BankPatch",
                },
            ],
        }
    })
);
