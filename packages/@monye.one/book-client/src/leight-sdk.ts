import {
    withClientSourceGenerators,
    withSdk
} from "@leight/sdk";

void withSdk(
    withClientSourceGenerators({
        SourceStore:    {
            entities: [
                {
                    name:     "CalendarEvent",
                    packages: {
                        schema: "@monye.one/book",
                    },
                },
            ],
        },
        SourceProvider: {
            entities: [
                {
                    name:     "CalendarEvent",
                    packages: {
                        schema: "@monye.one/book",
                    },
                    withTrpc: true,
                },
            ],
        },
        Trpc:           {
            entities: [
                {
                    name:     "CalendarEvent",
                    withTrpc: {
                        path:    "book.calendar.event",
                        package: "@monye.one/trpc-client",
                    },
                    packages: {
                        schema: "@monye.one/book",
                    },
                },
            ],
        }
    })
);
