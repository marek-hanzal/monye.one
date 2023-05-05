import {generatorCommon} from "@leight/sdk";

void generatorCommon({
    withRepositoryEx:     {
        repositories: [
            {
                name:     "Bank",
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
    withForm:             {
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
