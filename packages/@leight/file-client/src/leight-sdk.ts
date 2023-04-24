import {
    withClientSourceGenerators,
    withSdk
} from "@leight/sdk";

void withSdk(
    withClientSourceGenerators({
        SourceStore:    {
            entities: [
                {
                    name:     "File",
                    packages: {
                        schema: "@leight/file",
                    },
                },
            ],
        },
        SourceProvider: {
            entities: [
                {
                    name:     "File",
                    packages: {
                        schema: "@leight/file",
                    },
                }
            ],
        },
    })
);
