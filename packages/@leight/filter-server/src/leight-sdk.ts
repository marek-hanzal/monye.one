import {generatorServer} from "@leight/sdk";

void generatorServer({
    withRepositoryService:   {
        repositories: [
            {
                name:     "Filter",
                packages: {
                    schema: "@leight/filter",
                },
            },
        ],
    },
    withRepositoryMapper:    {
        repositories: [
            {
                name:     "Filter",
                packages: {
                    schema: "@leight/filter",
                },
            },
        ],
    },
    withRepositoryHandler:   {
        repositories: [
            {
                name:     "Filter",
                packages: {
                    schema: "@leight/filter",
                },
            },
        ],
    },
    withRepositoryContainer: {
        repositories: [
            {
                name:     "Filter",
                packages: {
                    schema: "@leight/filter",
                },
            }
        ],
    },
});
