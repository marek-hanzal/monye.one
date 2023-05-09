import {generatorCommon} from "@leight/sdk";

void generatorCommon({
    withRepository: {
        repositories: [
            {
                name: "Transaction",
            },
            {
                name: "TransactionKeyword",
            },
        ],
    },
    withRepositoryEx: {
        repositories: [
            {
                name: "Transaction",
                packages: {
                    prisma: "@monye.one/prisma",
                },
            },
            {
                name: "TransactionKeyword",
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
    withRepositoryMapper: {
        repositories: [
            {
                name: "Transaction",
            },
            {
                name: "TransactionKeyword",
            },
        ],
    },
    withForm: {
        forms: [
            {
                name: "TransactionFilter",
            },
        ],
    },
});
