import {generatorClient} from "@leight/sdk";

void generatorClient({
    withSource:     {
        sources: [
            {
                name:              "Transaction",
                packages:          {
                    schema: "@monye.one/transaction",
                },
                withInvalidator:   {
                    trpc: {
                        path:         "transaction",
                        package:      "@monye.one/trpc-client",
                        invalidators: [
                            "$query",
                        ],
                    },
                },
                withUseRepository: {
                    trpc: {
                        path:    "transaction",
                        package: "@monye.one/trpc-client",
                    },
                },
            },
        ],
    },
    withSelection:  {
        selections: [
            {
                name:     "Transaction",
                packages: {
                    schema: "@monye.one/transaction",
                },
            },
        ],
    },
    withTable:      {
        tables: [
            {
                name:     "Transaction",
                packages: {
                    schema: "@monye.one/transaction",
                },
            },
        ],
    },
    withFilterForm: {
        forms: [
            {
                name:        "Transaction",
                packages:    {
                    schema: "@monye.one/transaction",
                },
                translation: {
                    namespace: "translation",
                },
            },
        ],
    },
});
