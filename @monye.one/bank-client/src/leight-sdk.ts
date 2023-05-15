import {generatorClient} from "@leight/sdk";

void generatorClient({
    withSource:        {
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
                },
            },
        ],
    },
    withForm:          {
        forms: [
            {
                name:        "BankCreate",
                translation: {
                    namespace: "bank",
                },
                withTrpc:    {
                    source: "Bank",
                    use:    "useCreate",
                },
                packages:    {
                    schema: "@monye.one/bank",
                },
            },
            {
                type:        "dto",
                name:        "BankEdit",
                translation: {
                    namespace: "bank",
                },
                withTrpc:    {
                    source: "Bank",
                    use:    "usePatch",
                },
                packages:    {
                    schema: "@monye.one/bank",
                },
            },
            {
                type:        "dto",
                name:        "BankPatch",
                translation: {
                    namespace: "bank",
                },
                withTrpc:    {
                    source: "Bank",
                    use:    "usePatch",
                },
                packages:    {
                    schema: "@monye.one/bank",
                },
            },
        ],
    },
    withTable:         {
        tables: [
            {
                name:     "Bank",
                packages: {
                    schema: "@monye.one/bank",
                },
            },
        ],
    },
    withQueryProvider: {
        sources: [
            {
                name:     "Bank",
                packages: {
                    schema: "@monye.one/bank",
                },
            },
        ],
    },
    withSelection:     {
        selections: [
            {
                name:     "Bank",
                packages: {
                    schema: "@monye.one/bank",
                },
            },
        ],
    },
    withSelect:        {
        selects: [
            {
                name:     "Bank",
                packages: {
                    schema: "@monye.one/bank",
                },
            },
        ],
    },
});
