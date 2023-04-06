import {
    withClientSourceGenerators,
    withSdk
} from "@leight/sdk";

void withSdk(withClientSourceGenerators({
    entities: [
        {
            name:     "CalendarEvent",
            disabled: ["table"],
            trpc:     {
                path:    "book.calendar.event",
                package: "@monye.one/trpc-client",
            },
        },
    ],
    packages: {
        schema: "@monye.one/book",
    },
}));
