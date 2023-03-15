import {watch} from "turbowatch";

void watch({
    project:  __dirname,
    triggers: [
        {
            expression:    [
                "anyof",
                [
                    "match",
                    "*",
                    "basename"
                ],
            ],
            interruptible: false,
            name:          "start-server",
            persistent:    true,
            onChange:      async ({spawn}) => {
                await spawn`next dev`;
            },
        },
    ],
});
