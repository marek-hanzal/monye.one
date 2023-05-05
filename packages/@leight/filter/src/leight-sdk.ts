import {generatorCommon} from "@leight/sdk";

void generatorCommon({
    withRepositoryEx:        {
        repositories: [
            {
                name:     "Filter",
                packages: {
                    prisma: "@leight/prisma",
                },
            },
        ],
    },
    withRepositoryContainer: {
        repositories: [
            {
                name: "Filter",
            },
        ],
    },
});
