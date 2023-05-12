import {generatorCommon} from "@leight/sdk";

void generatorCommon({
    withRepository: {
        repositories: [
            {
                name:                 "User",
                withRepositoryEx:     {
                    packages: {
                        prisma: "@leight/prisma",
                    },
                },
                withRepositorySymbol: {
                    repositoryEx: {
                        type:        "IUserRepositoryEx",
                        withPackage: {
                            package: "../../api",
                        },
                    },
                },
                withRepositoryMapper: {},
            },
        ],
    },
    withSourceType: {
        sources: [
            {
                name: "User",
            },
        ],
    },
});
