import {
    withSdk,
    withServerSourceGenerators
} from "@leight/sdk";

void withSdk(withServerSourceGenerators({
    entities: [
        {
            name:     "CalendarEvent",
            packages: {
                schema: "@monye.one/book",
            }
        }
    ],
}));
