import {generatorClient} from "@leight/sdk";

void generatorClient({
    withSelection:     {
        selections: [
            {
                name:     "CalendarEvent",
                packages: {
                    schema: "@monye.one/book",
                },
            },
        ],
    },
    withSource:        {
        sources: [
            {
                name:              "CalendarEvent",
                packages:          {
                    schema: "@monye.one/book",
                },
                withInvalidator:   {
                    trpc: {
                        path:         "book.calendar.event",
                        invalidators: [
                            "$query",
                        ],
                        package:      "@monye.one/trpc-client",
                    },
                },
                withUseRepository: {
                    trpc: {
                        path:    "book.calendar.event",
                        package: "@monye.one/trpc-client",
                    },
                },
            },
        ],
    },
    withQueryProvider: {
        sources: [
            {
                name:     "CalendarEvent",
                packages: {
                    schema: "@monye.one/book",
                },
            },
        ],
    },
});
