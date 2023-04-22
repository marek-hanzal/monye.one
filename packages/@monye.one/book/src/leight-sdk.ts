import {
    withSdk,
    withSourceGenerators
}                            from "@leight/sdk";
import {CalendarEventSchema} from "./schema";

void withSdk(
    withSourceGenerators({
        EntitySource: {
            entities: [
                {
                    name:         "CalendarEvent",
                    withSchemaEx: {
                        schema: {
                            type:        "CalendarEventSchema",
                            withPackage: {
                                import:  "CalendarEventBaseSchema",
                                package: "../../schema"
                            },
                        },
                        dto:    {
                            type:        "CalendarEventSchema",
                            withPackage: {
                                import:  "CalendarEventBaseSchema",
                                package: "../../schema"
                            },
                        },
                        filter: {
                            type:        "CalendarEventFilterSchemaEx",
                            withPackage: {
                                package: "../../schema"
                            },
                        },
                    },
                },
            ],
        },
    })
);
