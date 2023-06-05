import {generatorServer} from "@leight/sdk";

void generatorServer({
    withRepositoryEx:        {
        repositories: [
            {
                name:     "Keyword",
                packages: {
                    schema: "@leight/keyword",
                    prisma: "@leight/prisma",
                },
                prisma:   "keyword",
            },
        ],
    },
    withRepositoryService:   {
        repositories: [
            {
                name:     "Keyword",
                packages: {
                    schema: "@leight/keyword",
                },
            },
        ],
    },
    withRepositoryMapper:    {
        repositories: [
            {
                name:     "Keyword",
                packages: {
                    schema: "@leight/keyword",
                },
            },
        ],
    },
    withRepositoryContainer: {
        repositories: [
            {
                name:     "Keyword",
                packages: {
                    schema: "@leight/keyword",
                },
            },
        ],
    },
    withRepositoryHandler:   {
        repositories: [
            {
                name:     "Keyword",
                packages: {
                    schema: "@leight/keyword",
                },
            },
        ],
    },
});
