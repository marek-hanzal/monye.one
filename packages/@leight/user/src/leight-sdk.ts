import {generatorCommon} from "@leight/sdk";

void generatorCommon({
    withRepository: {
        repositories: [
            {
                name: 'User',
            },
        ],
    },
    withRepositoryEx: {
        repositories: [
            {
                name: "User",
                packages: {
                    prisma: "@leight/prisma",
                },
            },
        ],
    },
    withRepositorySymbol: {
        repositories: [
            {
                name: "User",
            },
        ],
    },
});
