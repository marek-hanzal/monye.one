import {generatorCommon} from "@leight/sdk";

void generatorCommon({
    withRepository: {
        repositories: [
            {
                name: "Bank",
            },
        ],
    },
    withRepositoryEx: {
        repositories: [
            {
                name: "Bank",
                packages: {
                    prisma: "@monye.one/prisma",
                },
            },
        ],
    },
    withRepositorySymbol: {
        repositories: [
            {
                name: "Bank",
            },
        ],
    },
    withForm: {
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
    },
});
