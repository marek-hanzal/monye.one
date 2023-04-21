import {
    withSdk,
    withServerSourceGenerators,
    withServerSourceGeneratorsEntity
} from "@leight/sdk";

void withSdk(
    withServerSourceGenerators(
        withServerSourceGeneratorsEntity({
            name:     "File",
            packages: {
                schema: "@leight/file",
                prisma: "@leight/prisma",
            },
            prisma:   "file",
            withSourceEx: {
                type: 'FileSourceEx',
                withPackage: {
                    package: '../../source',
                },
            },
        })
    )
);
