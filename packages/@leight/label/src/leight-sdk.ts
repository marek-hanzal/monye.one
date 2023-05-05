import {generatorCommon} from "@leight/sdk";

void generatorCommon({
    withRepositoryEx:     {
        repositories: [
            {
                name:     "Label",
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
