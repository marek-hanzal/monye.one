import {
    withSdk,
    withSourceGenerators
} from "@leight/sdk";

void withSdk(
    withSourceGenerators({
        EntitySource: {
            entities: [
                {
                    name:         "CalendarEvent",
                    withSchemaEx: {
                        schema: {
                            type:        "CoolCalendarEventBaseSchema",
                            withPackage: {
                                import:  "CalendarEventBaseSchema",
                                alias:   "CoolCalendarEventBaseSchema",
                                package: "../api"
                            },
                        },
                        filter: {
                            type:        "CoolCalendarEventSourceSchema['FilterSchema']",
                            withPackage: {
                                import:  "CalendarEventSourceSchema",
                                alias:   "CoolCalendarEventSourceSchema",
                                package: "@leight/calendar",
                            },
                        },
                    },
                },
            ],
        },
    })
);
