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
                withFilter:  {
                    type:    "@monye.one/transaction",
                    package: {
                        type:        "FilterSource",
                        withPackage: {
                            package: "@monye.one/filter-client",
                        },
                    },
                },
            },
        ],
    },
    withForm:       {
        forms: [
            {
                type:        "dto",
                name:        "TransactionLabel",
                translation: {
                    namespace: "transaction",
                },
                packages:    {
                    schema: "@monye.one/transaction",
                },
                withTrpc:    {
                    source: "Transaction",
                    use:    "usePatchBy",
                },
            },
        ],
    },
});
