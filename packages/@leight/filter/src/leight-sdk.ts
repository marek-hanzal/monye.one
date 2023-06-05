import {generatorCommon} from "@leight/sdk";

void generatorCommon({
    withRepository: {
        repositories: [
            {
                name:                 "Filter",
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
                name: "Filter",
            },
        ],
    },
});
