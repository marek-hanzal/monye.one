import {generatorCommon} from "@leight/sdk";

void generatorCommon({
    withRepository: {
        repositories: [
            {
                name:                 "Transaction",
                withRepositoryEx:     {
                    packages: {
                        prisma: "@monye.one/prisma",
                    },
                },
                withRepositorySymbol: {},
                withRepositoryMapper: {},
            },
            {
                name:                 "TransactionKeyword",
                withRepositoryEx:     {
                    packages: {
                        prisma: "@monye.one/prisma",
                    },
                },
                withRepositorySymbol: {},
                withRepositoryMapper: {},
            },
        ],
    },
    withSourceType: {
        sources: [
            {
                name: "Transaction",
            },
            {
                name: "TransactionKeyword",
            },
        ],
    },
    withForm:       {
        forms: [
            {
                name: "TransactionFilter",
            },
        ],
    },
});
