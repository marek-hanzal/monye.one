import {generatorServer} from "@leight/sdk";

void generatorServer({
    withRepositoryEx:        {
        repositories: [
            {
                name:     "User",
                packages: {
                    schema: "@leight/user",
                    prisma: "@leight/prisma",
                },
                prisma:   "user",
            },
        ],
    },
    withRepositoryMapper:    {
        repositories: [
            {
                name:     "User",
                packages: {
                    schema: "@leight/user",
                },
            },
        ],
    },
    withRepositoryService:   {
        repositories: [
            {
                name:     "User",
                packages: {
                    schema: "@leight/user",
                },
            },
        ],
    },
    withRepositoryContainer: {
        repositories: [
            {
                name:         "User",
                packages:     {
                    schema: "@leight/user",
                },
                repositoryEx: {
                    type:        "IUserRepositoryEx",
                    withPackage: {
                        package: "@leight/user",
                    },
                },
            },
        ],
    },
});
