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
                withRepositorySymbol: {},
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
