import {generatorCommon} from "@leight/sdk";

void generatorCommon({
    withRepositoryEx:     {
        repositories: [
            {
                name:     "File",
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
