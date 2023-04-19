import {
    withSdk,
    withServerProcedure
} from "@leight/sdk";

void withSdk(
    withServerProcedure({
        procedures: [
            {
                name:     "Bank",
                packages: {
                    procedure: "@monye.one/bank-server",
                },
            },
            {
                name:     "CalendarEvent",
                packages: {
                    procedure: "@monye.one/book-server",
                },
            },
            {
                name:     "Job",
                packages: {
                    procedure: "@leight/job-server",
                },
            },
            {
                name:     "Transaction",
                packages: {
                    procedure: "@monye.one/transaction-server",
                },
            },
        ],
    })
);
