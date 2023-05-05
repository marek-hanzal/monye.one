import {generatorServer} from "@leight/sdk";

void generatorServer({
    withRepository: {
        repositories: [
            {
                name:     "CalendarEvent",
                packages: {
                    schema: "@monye.one/book",
                },
            },
        ],
    },
});
