import {generatorServer} from "@leight/sdk";

void generatorServer({
    withRepositoryEx:        {
        repositories: [
            {
                name:     "File",
                packages: {
                    schema: "@leight/file",
                    prisma: "@leight/prisma",
                },
                prisma:   "file",
            },
        ],
    },
    withRepositoryMapper:    {
        repositories: [
            {
                name:     "File",
                packages: {
                    schema: "@leight/file",
                },
            },
        ],
    },
    withRepositoryService:   {
        repositories: [
            {
                name:     "File",
                packages: {
                    schema: "@leight/file",
                },
            },
        ],
    },
    withRepositoryContainer: {
        repositories: [
            {
                name:     "File",
                packages: {
                    schema: "@leight/file",
                },
            },
        ],
    },
    withRepositoryHandler:   {
        repositories: [
            {
                name:     "File",
                packages: {
                    schema: "@leight/file",
                },
            },
        ],
    },
});
