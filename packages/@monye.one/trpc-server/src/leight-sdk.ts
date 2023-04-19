import {
    withSdk,
    withServerTrpcRouter
} from "@leight/sdk";

void withSdk(
    withServerTrpcRouter({
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
