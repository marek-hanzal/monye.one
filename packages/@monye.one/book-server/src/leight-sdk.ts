import {generatorServer} from "@leight/sdk";

void generatorServer({
    withRepository: {
        repositories: [
            {
                name: "CalendarEvent",
                packages: {
                    schema: "@monye.one/book",
                },
            },
        ],
    },
    withRepositoryContainer: {
        repositories: [
            {
                name: "CalendarEvent",
                type: "common",
                packages: {
                    schema: "@monye.one/book",
                },
            },
        ],
    },
});
