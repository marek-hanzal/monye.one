import {
    withSdk,
    withSourceGenerators
} from "@leight/sdk";

void withSdk(
    withSourceGenerators({
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
