import {generatorServer} from "@leight/sdk";

void generatorServer({
    withRepositoryEx:        {
        repositories: [
            {
                name:     "Label",
                packages: {
                    schema: "@leight/label",
                    prisma: "@leight/prisma",
                },
                prisma:   "label",
            },
        ],
    },
    withRepositoryMapper:    {
        repositories: [
            {
                name:     "Label",
                packages: {
                    schema: "@leight/label",
                },
            },
        ],
    },
    withRepositoryService:   {
        repositories: [
            {
                name:     "Label",
                packages: {
                    schema: "@leight/label",
                },
            },
        ],
    },
    withRepositoryContainer: {
        repositories: [
            {
                name:     "Label",
                packages: {
                    schema: "@leight/label",
                },
            },
        ],
    },
    withRepositoryHandler:   {
        repositories: [
            {
                name:     "Label",
                packages: {
                    schema: "@leight/label",
                },
            },
        ],
    },
});
