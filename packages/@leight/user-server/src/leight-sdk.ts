import {generatorServer} from "@leight/sdk";

void generatorServer({
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
