import {withClientSourceGenerators, withSdk} from "@leight/sdk";

void withSdk(
    withClientSourceGenerators({
        Selection: {
            selections: [
                {
                    name: "Filter",
                    packages: {
                        schema: "@leight/filter",
                    },
                },
            ],
        },
        Select: {
            selects: [
                {
                    name: "Filter",
                    packages: {
                        schema: "@leight/filter",
                    },
                },
            ],
        },
        SourceTable: {
            entities: [
                {
                    name: "Filter",
                    packages: {
                        schema: "@leight/filter",
                    },
                },
            ],
        },
        Trpc: {
            entities: [
                {
                    name: "Filter",
                    packages: {
                        schema: "@leight/filter",
                    },
                    withTrpc: {
                        path: "filter",
                        package: "@monye.one/trpc-client",
                        invalidators: [
                            "filter.source.query",
                            "filter.source.count",
                        ],
                    },
                }
            ],
        },
        SourceStore: {
            entities: [
                {
                    name: "Filter",
                    packages: {
                        schema: "@leight/filter",
                    },
                },
            ],
        },
        SourceProvider: {
            entities: [
                {
                    name: "Filter",
                    packages: {
                        schema: "@leight/filter",
                    },
                },
            ],
        },
    })
);
