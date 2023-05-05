import {generatorCommon} from "@leight/sdk";

void generatorCommon({
    withRepositorySymbol: {
        repositories: [
            {
                name: "Keyword",
            },
        ],
    },
    withRepositoryEx:     {
        repositories: [
            {
                name:     "Keyword",
                packages: {
                    prisma: "@leight/prisma",
                },
            },
        ],
    },
});
