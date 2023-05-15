import {generatorClient} from "@leight/sdk";

void generatorClient({
    withInvalidator: {
        invalidators: [
            {
                name:     "Transaction",
                packages: {
                    schema: "@monye.one/transaction",
                },
                trpc:     {
                    path:         "transaction",
                    package:      "@monye.one/trpc-client",
                    invalidators: [
                        "$query",
                    ],
                },
            },
        ],
    },
});
