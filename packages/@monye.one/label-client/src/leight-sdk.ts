import {
    withClientSourceGenerators,
    withSdk
} from "@leight/sdk";

void withSdk(
    withClientSourceGenerators({
        Form:           {
            forms: [
                {
                    name:        "LabelCreate",
                    translation: {
                        namespace: "label",
                    },
                    withTrpc:    {
                        source: "Label",
                        use:    "useCreate",
                    },
                    packages:    {
                        schema: "@leight/label",
                    },
                },
                {
                    type:        "dto",
                    name:        "LabelEdit",
                    translation: {
                        namespace: "label",
                    },
                    withTrpc:    {
                        source: "Label",
                        use:    "usePatch",
                    },
                    packages:    {
                        schema: "@leight/label",
                    },
                },
                {
                    type:        "dto",
                    name:        "LabelPatch",
                    translation: {
                        namespace: "label",
                    },
                    withTrpc:    {
                        source: "Label",
                        use:    "usePatch",
                    },
                    packages:    {
                        schema: "@leight/label",
                    },
                },
            ],
        },
        Selection:      {
            selections: [
                {
                    name:     "Label",
                    packages: {
                        schema: "@leight/label",
                    },
                },
            ],
        },
        Select:         {
            selects: [
                {
                    name:     "Label",
                    packages: {
                        schema: "@leight/label",
                    },
                },
            ],
        },
        SourceTable:    {
            entities: [
                {
                    name:     "Label",
                    packages: {
                        schema: "@leight/label",
                    },
                },
            ],
        },
        Trpc:           {
            entities: [
                {
                    name:     "Label",
                    packages: {
                        schema: "@leight/label",
                    },
                    withTrpc: {
                        path:         "label",
                        package:      "@monye.one/trpc-client",
                        invalidators: [
                            "label.source.query",
                            "label.source.count",
                        ],
                    },
                }
            ],
        },
        SourceStore:    {
            entities: [
                {
                    name:     "Label",
                    packages: {
                        schema: "@leight/label",
                    },
                },
            ],
        },
        SourceProvider: {
            entities: [
                {
                    name:     "Label",
                    packages: {
                        schema: "@leight/label",
                    },
                },
            ],
        },
    })
);
