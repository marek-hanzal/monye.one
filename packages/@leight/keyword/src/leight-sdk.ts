import {generatorCommon} from "@leight/sdk";

void generatorCommon({
    withRepository: {
        repositories: [
            {
                name:                 "Keyword",
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
                name: "Keyword",
            },
        ],
    },
});
