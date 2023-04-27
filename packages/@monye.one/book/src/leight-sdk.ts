import {
    withSdk,
    withSourceGenerators
} from "@leight/sdk";

void withSdk(
    withSourceGenerators({
        EntitySource: {
            entities: [
                {
                    name: "CalendarEvent",
                },
            ],
        },
    })
);
