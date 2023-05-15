import {generatorClient} from "@leight/sdk";

void generatorClient({
    withSource:        {
        sources: [
            {
                name:              "Filter",
                packages:          {
                    schema: "@leight/filter",
                },
                withInvalidator:   {
                    trpc: {
                        path:         "filter",
                        package:      "@monye.one/trpc-client",
                        invalidators: [
                            "$query",
                        ],
                    },
                },
                withUseRepository: {
                    trpc: {
                        path:    "filter",
                        package: "@monye.one/trpc-client",
                    },
                }
            },
        ],
    },
    withTable:         {
        tables: [
            {
                name:     "Filter",
                packages: {
                    schema: "@leight/filter",
                },
            },
        ],
    },
    withSelection:     {
        selections: [
            {
                name:     "Filter",
                packages: {
                    schema: "@leight/filter",
                },
            },
        ],
    },
    withSelect:        {
        selects: [
            {
                name:     "Filter",
                packages: {
                    schema: "@leight/filter",
                },
            },
        ],
    },
    withQueryProvider: {
        sources: [
            {
                name:     "Filter",
                packages: {
                    schema: "@leight/filter",
                },
            }
        ],
    },
});
