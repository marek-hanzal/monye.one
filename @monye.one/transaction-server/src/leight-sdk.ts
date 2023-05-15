import {generatorServer} from "@leight/sdk";

void generatorServer({
    withRepositoryEx:        {
        repositories: [
            {
                name:        "Transaction",
                prisma:      "transaction",
                packages:    {
                    schema: "@monye.one/transaction",
                    prisma: "@monye.one/prisma",
                },
                withInclude: {
                    bank: true,
                },
            },
            {
                name:     "TransactionKeyword",
                prisma:   "transactionKeyword",
                packages: {
                    schema: "@monye.one/transaction",
                    prisma: "@monye.one/prisma",
                },
            },
        ],
    },
    withRepositoryMapper:    {
        repositories: [
            {
                name:     "Transaction",
                packages: {
                    schema: "@monye.one/transaction",
                },
            },
            {
                name:     "TransactionKeyword",
                packages: {
                    schema: "@monye.one/transaction",
                },
            },
        ],
    },
    withRepositoryService:   {
        repositories: [
            {
                name:     "Transaction",
                packages: {
                    schema: "@monye.one/transaction",
                },
            },
            {
                name:     "TransactionKeyword",
                packages: {
                    schema: "@monye.one/transaction",
                },
            },
        ],
    },
    withRepositoryContainer: {
        repositories: [
            {
                name:     "Transaction",
                packages: {
                    schema: "@monye.one/transaction",
                },
            },
            {
                name:     "TransactionKeyword",
                packages: {
                    schema: "@monye.one/transaction",
                },
            },
        ],
    },
    withRepositoryHandler:   {
        repositories: [
            {
                name:     "Transaction",
                packages: {
                    schema: "@monye.one/transaction",
                },
            },
            {
                name:     "TransactionKeyword",
                packages: {
                    schema: "@monye.one/transaction",
                },
            },
        ],
    }
});
