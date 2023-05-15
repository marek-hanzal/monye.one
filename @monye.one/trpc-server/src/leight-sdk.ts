import {generatorServer} from "@leight/sdk";

void generatorServer({
    withRepositoryRouter: {
        procedures: [
            {
                name:     "Bank",
                packages: {
                    schema:    "@monye.one/bank",
                    procedure: "@monye.one/bank-server",
                },
            },
            {
                name:     "CalendarEvent",
                packages: {
                    schema:    "@monye.one/book",
                    procedure: "@monye.one/book-server",
                },
            },
            {
                name:     "Job",
                packages: {
                    schema:    "@leight/job",
                    procedure: "@leight/job-server",
                },
            },
            {
                name:     "Transaction",
                packages: {
                    schema:    "@monye.one/transaction",
                    procedure: "@monye.one/transaction-server",
                },
            },
            {
                name:     "Filter",
                packages: {
                    schema:    "@leight/filter",
                    procedure: "@leight/filter-server",
                },
            },
            {
                name:     "Label",
                packages: {
                    schema:    "@leight/label",
                    procedure: "@leight/label-server",
                },
            },
        ],
    },
});
