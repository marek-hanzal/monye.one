import {generatorCommon} from "@leight/sdk";

void generatorCommon({
    withRepository: {
        repositories: [
            {
                name:                 "Bank",
                withRepositoryEx:     {
                    packages: {
                        prisma: "@monye.one/prisma",
                    },
                },
                withRepositoryMapper: {},
                withRepositorySymbol: {},
            },
        ],
    },
    withSourceType: {
        sources: [
            {
                name: "Bank",
            },
        ],
    },
    withForm:       {
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
