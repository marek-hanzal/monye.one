import {generatorClient} from "@leight/sdk";

void generatorClient({
    withSelection: {
        selections: [
            {
                name: "Job",
                packages: {
                    schema: "@leight/job",
                },
            },
        ],
    },
});
