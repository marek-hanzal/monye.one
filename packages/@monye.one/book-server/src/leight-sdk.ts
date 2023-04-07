import {
    withSdk,
    withServerSourceGenerators
} from "@leight/sdk";

void withSdk(
    withServerSourceGenerators({
        BaseSource: {
            entities: [
                {
                    name:     "CalendarEvent",
                    packages: {
                        schema: "@monye.one/book",
                    },
                },
            ],
        },
        Source:     {
            entities: [
                {
                    name:     "CalendarEvent",
                    packages: {
                        schema: "@monye.one/book",
                    },
                    sourceEx: {
                        type:    "CalendarEventBaseSourceEx",
                        package: "../source",
                    },
                },
            ],
        },
        TrpcSource: {
            entities: [
                {
                    name:     "CalendarEvent",
                    packages: {
                        schema: "@monye.one/book",
                    },
                }
            ]
        }
    })
);
