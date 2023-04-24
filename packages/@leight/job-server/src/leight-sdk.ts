import {
    withSdk,
    withServerSourceGenerators
} from "@leight/sdk";

void withSdk(
    withServerSourceGenerators({
        PrismaSource: {
            entities: [
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
        Source:       {
            entities: [
                {
                    name:     "Job",
                    packages: {
                        schema: "@leight/job",
                    },
                },
            ],
        },
        BaseSource: {
            entities:[
                {
                    name:     "Job",
                    packages: {
                        schema: "@leight/job",
                    },
                },
            ],
        },
    })
);
