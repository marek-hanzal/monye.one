import {generatorCommon} from "@leight/sdk";

void generatorCommon({
    withRepository: {
        repositories: [
            {
                name:                 "Label",
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
                name: "Label",
            },
        ],
    },
});
