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
    withRepositoryMapper: {
        repositories: [
            {
                name: "CalendarEvent",
                packages: {
                    schema: "@monye.one/book",
                },
            },
        ],
    },
    withRepositoryService: {
        repositories: [
            {
                name: "CalendarEvent",
                packages: {
                    schema: "@monye.one/book",
                },
            },
        ],
    },
    withRepositoryHandler: {
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
