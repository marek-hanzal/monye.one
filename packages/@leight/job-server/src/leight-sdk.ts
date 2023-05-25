import {generatorServer} from "@leight/sdk";

void generatorServer({
    withRepositoryEx:        {
        repositories: [
            {
                name:     "Job",
                packages: {
                    schema: "@leight/job",
                    prisma: "@leight/prisma",
                },
                prisma:   "job",
            },
        ],
    },
    withRepositoryMapper:    {
        repositories: [
            {
                name:     "Job",
                packages: {
                    schema: "@leight/job",
                },
            },
        ],
    },
    withRepositoryService:   {
        repositories: [
            {
                name:     "Job",
                packages: {
                    schema: "@leight/job",
                },
            },
        ],
    },
    withRepositoryContainer: {
        repositories: [
            {
                name:     "Job",
                packages: {
                    schema: "@leight/job",
                },
            },
        ],
    },
    withRepositoryHandler:   {
        repositories: [
            {
                name:     "Job",
                packages: {
                    schema: "@leight/job",
                },
            },
        ],
    },
});
