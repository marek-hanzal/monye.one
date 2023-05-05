import {generatorCommon} from "@leight/sdk";

void generatorCommon({
    withRepositoryEx:     {
        repositories: [
            {
                name:     "Transaction",
                packages: {
                    prisma: "@monye.one/prisma",
                },
            },
            {
                name:     "TransactionKeyword",
                packages: {
                    prisma: "@monye.one/prisma",
                },
            },
        ],
    },
    withRepositorySymbol: {
        repositories: [
            {
                name: "Transaction",
            },
            {
                name: "TransactionKeyword",
            },
        ],
    },
    withForm:             {
        forms: [
            {
                name: "TransactionFilter",
            },
        ],
    },
});
