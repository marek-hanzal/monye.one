import {generatorCommon} from "@leight/sdk";

void generatorCommon({
    withRepositoryEx:     {
        repositories: [
            {
                name:     "User",
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
