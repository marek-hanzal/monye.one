import {generatorClient} from "@leight/sdk";

void generatorClient({
    withSource: {
        sources: [
            {
                name:              "Bank",
                packages:          {
                    schema: "@monye.one/bank",
                },
                withInvalidator:   {
                    trpc: {
                        path:         "bank",
                        package:      "@monye.one/trpc-client",
                        invalidators: [
                            "$query",
                        ],
                    },
                },
                withUseRepository: {
                    trpc: {
                        path:    "bank",
                        package: "@monye.one/trpc-client",
                    },
                }
            },
        ],
    },
});
