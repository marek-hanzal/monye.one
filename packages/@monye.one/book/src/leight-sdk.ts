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
                            type:        "CalendarEventBaseSchema",
                            withPackage: {
                                package: "../api",
                                alias:   "CoolCalendarEventBaseSchema"
                            },
                        },
                        filter: {
                            type:        "CalendarEventFilterSchema",
                            withPackage: {
                                package: "@leight/calendar",
                                alias:   "CoolCalendarEventFilterSchema",
                            },
                        },
                    },
                },
            ],
        },
    })
);
