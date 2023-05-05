import {generatorServer} from "@leight/sdk";

void generatorServer({
    withRepositoryEx: {
        entities: [
            {
                name:     "Filter",
                packages: {
                    schema: "@leight/filter",
                    prisma: "@leight/prisma",
                },
                prisma:   "filter",
            },
        ],
    },
    Source:           {
        entities: [
            {
                name:     "Filter",
                packages: {
                    schema: "@leight/filter",
                },
            },
        ],
    },
    TrpcSource:       {
        entities: [
            {
                name:     "Filter",
                packages: {
                    schema: "@leight/filter",
                },
            },
        ],
    }
});
