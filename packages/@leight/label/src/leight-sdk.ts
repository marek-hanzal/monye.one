import {generatorCommon} from "@leight/sdk";

void generatorCommon({
    withRepository: {
        repositories: [
            {
                name: "Label",
            },
        ],
    },
    withRepositoryMapper: {
        repositories: [
            {
                name: "Label",
            },
        ],
    },
    withRepositoryEx: {
        repositories: [
            {
                name: "Label",
                packages: {
                    prisma: "@leight/prisma",
                },
            },
        ],
    },
    withRepositorySymbol: {
        repositories: [
            {
                name: "Label",
            },
        ],
    },
});
