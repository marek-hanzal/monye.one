import {
    withClientSourceGenerators,
    withClientSourceGeneratorsEntity,
    withSdk
} from "@leight/sdk";

void withSdk(
    withClientSourceGenerators(
        withClientSourceGeneratorsEntity({
            disabled: ["table"],
            name:     "File",
            packages: {
                schema: "@leight/file",
            },
        })
    )
);
