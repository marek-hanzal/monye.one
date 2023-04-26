import {
    withClientSourceGenerators,
    withSdk
} from "@leight/sdk";

void withSdk(
    withClientSourceGenerators({
        SourceStore:    {
            entities: [],
        },
        SourceProvider: {
            entities: [],
        },
    })
);
