import {generatorCommon} from "@leight/sdk";

void generatorCommon({
    withRepository: {
        repositories: [
            {
                name: "File",
            },
        ],
    },
    withRepositoryEx: {
        repositories: [
            {
                name: "File",
                packages: {
                    prisma: "@leight/prisma",
                },
            },
        ],
    },
    withRepositorySymbol: {
        repositories: [
            {
                name: "File",
            },
        ],
    },
});
