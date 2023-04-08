import {
    withSdk,
    withSourceGenerators
} from "@leight/sdk";

void withSdk(
    withSourceGenerators({
        Source:       {
            entities: [
                {
                    name: "CalendarEvent",
                },
            ],
        },
        SourceSchema: {
            entities: [
                {
                    name: "CalendarEvent",
                },
            ],
        },
        EntitySchema: {
            entities: [
                {
                    name:       "CalendarEvent",
                    withSchema: {
                        schema: {
                            type:    "CalendarEventBaseSchema",
                            package: "../api",
                        },
                        filter: {
                            type:    "CalendarEventFilterSchema",
                            package: "@leight/calendar",
                        },
                    },
                },
            ],
        },
    })
);
