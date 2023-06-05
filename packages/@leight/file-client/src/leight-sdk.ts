import {generatorClient} from "@leight/sdk";

void generatorClient({
    withSelection: {
        selections: [
            {
                name:     "File",
                packages: {
                    schema: "@leight/file",
                },
            },
        ],
    },
});
