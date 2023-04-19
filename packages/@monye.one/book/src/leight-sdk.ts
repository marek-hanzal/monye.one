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
                        schema:    {
                            type:        "CalendarEventBaseSchema",
                            withPackage: {
                                import:  "CalendarEventBaseSchema",
                                package: "../schema"
                            },
                        },
                        dto:    {
                            type:        "CalendarEventBaseSchema",
                            withPackage: {
                                import:  "CalendarEventBaseSchema",
                                package: "../schema"
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
