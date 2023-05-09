import {generatorCommon} from "@leight/sdk";

void generatorCommon({
    withRepositorySymbol: {
        repositories: [
            {
                name: "Job",
            },
        ],
    },
    withRepository: {
        repositories: [
            {
                name: "Job",
            },
        ],
    },
    withRepositoryEx: {
        repositories: [
            {
                name: "Job",
                packages: {
                    prisma: "@leight/prisma",
                },
            },
        ],
    },
});
