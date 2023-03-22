import {
    withClientSourceGenerators,
    withSdk
} from "@leight/sdk";

void withSdk(withClientSourceGenerators({
    modelName:     "File",
    schemaPackage: "@leight/file",
    trpcPackage:   false,
    trpcPath:      false,
}));
