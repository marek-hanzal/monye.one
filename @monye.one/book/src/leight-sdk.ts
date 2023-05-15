import {generatorCommon} from "@leight/sdk";

void generatorCommon({
    withSourceType: {
        sources: [
            {
                name: "CalendarEvent",
            },
        ],
    },
    withRepository: {
        repositories: [
            {
                name:                 "CalendarEvent",
                withRepositoryMapper: {},
                withRepositorySymbol: {},
            },
        ],
    },
});
