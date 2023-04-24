import {
    withClientSourceGenerators,
    withSdk
} from "@leight/sdk";

void withSdk(
    withClientSourceGenerators({
        SourceStore:    {
            entities: [
                {
                    name:     "Job",
                    packages: {
                        schema: "@leight/job",
                    },
                }
            ],
        },
        SourceProvider: {
            entities: [
                {
                    name:     "Job",
                    packages: {
                        schema: "@leight/job",
                    },
                    withTrpc: false,
                },
            ],
        },
    })
);
