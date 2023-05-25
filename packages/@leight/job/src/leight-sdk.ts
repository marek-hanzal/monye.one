import {generatorCommon} from "@leight/sdk";

void generatorCommon({
    withRepository: {
        repositories: [
            {
                name:                 "Job",
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
                name: "Job",
            },
        ],
    },
});
