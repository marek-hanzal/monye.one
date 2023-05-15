import {generatorServer} from "@leight/sdk";

void generatorServer({
    withRepositoryEx:        {
        repositories: [
            {
                name:     "Bank",
                prisma:   "bank",
                packages: {
                    schema: "@monye.one/bank",
                    prisma: "@monye.one/prisma",
                },
            },
        ],
    },
    withRepositoryMapper:    {
        repositories: [
            {
                name:     "Bank",
                packages: {
                    schema: "@monye.one/bank",
                },
            },
        ],
    },
    withRepositoryService:   {
        repositories: [
            {
                name:     "Bank",
                packages: {
                    schema: "@monye.one/bank",
                },
            },
        ],
    },
    withRepositoryContainer: {
        repositories: [
            {
                name:     "Bank",
                packages: {
                    schema: "@monye.one/bank",
                },
            },
        ],
    },
    withRepositoryHandler:   {
        repositories: [
            {
                name:     "Bank",
                packages: {
                    schema: "@monye.one/bank",
                },
            },
        ],
    },
});
