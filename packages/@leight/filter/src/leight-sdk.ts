import {generatorCommon} from "@leight/sdk";

void generatorCommon({
    withRepositorySymbol: {
        repositories: [
            {
                name: "Filter",
            }
        ],
    },
    withRepository: {
        repositories: [
            {
                name: "Filter",
            },
        ],
    },
    withRepositoryEx: {
        repositories: [
            {
                name: "Filter",
                packages: {
                    prisma: "@leight/prisma",
                },
            },
        ],
    },
});
