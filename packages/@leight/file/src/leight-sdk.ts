import {generatorCommon} from "@leight/sdk";

void generatorCommon({
    withRepository: {
        repositories: [
            {
                name:                 "File",
                withRepositoryEx:     {
                    packages: {
                        prisma: "@leight/prisma",
                    },
                },
                withRepositoryMapper: {},
                withRepositorySymbol: {},
            },
        ],
    },
    withSourceType: {
        sources: [
            {
                name: "File",
            },
        ],
    },
});
