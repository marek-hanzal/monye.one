import {generatorClient} from "@leight/sdk";

void generatorClient({
    withSource:        {
        sources: [
            {
                name:              "Label",
                packages:          {
                    schema: "@leight/label",
                },
                withInvalidator:   {
                    trpc: {
                        path:         "label",
                        package:      "@monye.one/trpc-client",
                        invalidators: [
                            "$query",
                        ],
                    },
                },
                withUseRepository: {
                    trpc: {
                        path:    "label",
                        package: "@monye.one/trpc-client",
                    },
                },
            },
        ],
    },
    withSelection:     {
        selections: [
            {
                name:     "Label",
                packages: {
                    schema: "@leight/label",
                },
            },
        ],
    },
    withForm:          {
        forms: [
            {
                name:        "LabelCreate",
                packages:    {
                    schema: "@leight/label",
                },
                translation: {
                    namespace: "label",
                },
                withTrpc:    {
                    use:    "useCreate",
                    source: "Label",
                },
            },
        ],
    },
    withQueryProvider: {
        sources: [
            {
                name:     "Label",
                packages: {
                    schema: "@leight/label",
                },
            },
        ],
    },
});
