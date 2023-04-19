import {
    withClientSourceGenerators,
    withClientSourceGeneratorsEntity,
    withSdk
} from "@leight/sdk";

void withSdk(
    withClientSourceGenerators(
        withClientSourceGeneratorsEntity({
            disabled: ["table"],
            name:     "Job",
            packages: {
                schema: "@leight/job",
            },
        })
    )
);
