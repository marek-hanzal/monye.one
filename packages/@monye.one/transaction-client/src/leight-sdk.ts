import {generatorClient} from "@leight/sdk";

void generatorClient({
    withSource: {
        sources: [
            {
                name:     "Transaction",
                packages: {
                    schema: "@monye.one/transaction",
                },
            },
        ],
    },
});

// void withSdk(
//     withClientSourceGenerators({
//         SourceStore:    {
//             entities: [
//                 {
//                     name:     "Transaction",
//                     packages: {
//                         schema: "@monye.one/transaction",
//                     },
//                 },
//             ],
//         },
//         SourceProvider: {
//             entities: [
//                 {
//                     name:     "Transaction",
//                     packages: {
//                         schema: "@monye.one/transaction",
//                     },
//                 },
//             ],
//         },
//         SourceTable:    {
//             entities: [
//                 {
//                     name:     "Transaction",
//                     packages: {
//                         schema: "@monye.one/transaction",
//                     },
//                 },
//             ],
//         },
//         Trpc:           {
//             entities: [
//                 {
//                     name:     "Transaction",
//                     packages: {
//                         schema: "@monye.one/transaction",
//                     },
//                     withTrpc: {
//                         path:         "transaction",
//                         package:      "@monye.one/trpc-client",
//                         invalidators: [
//                             "transaction.source.query",
//                             "transaction.source.count",
//                         ],
//                     },
//                 },
//             ],
//         },
//         Form:           {
//             forms: [
//                 {
//                     name:        "TransactionLabel",
//                     type:        "dto",
//                     translation: {
//                         namespace: "transaction",
//                     },
//                     packages:    {
//                         schema: "@monye.one/transaction",
//                     },
//                     withTrpc:    {
//                         source: "Transaction",
//                         use:    "usePatchBy",
//                     },
//                 },
//             ],
//         },
//         FilterForm:     {
//             forms: [
//                 {
//                     name:        "Transaction",
//                     translation: {
//                         namespace: "transaction"
//                     },
//                     packages:    {
//                         schema: "@monye.one/transaction",
//                     },
//                     withFilter:  {
//                         type:    "@monye.one/transaction",
//                         package: {
//                             type:        "UseFilterSourceQuery",
//                             withPackage: {
//                                 package: "@monye.one/filter-client",
//                             },
//                         },
//                     },
//                 },
//             ],
//         },
//         Selection:      {
//             selections: [
//                 {
//                     name:     "Transaction",
//                     packages: {
//                         schema: "@monye.one/transaction",
//                     },
//                 },
//             ],
//         },
//         Select:         {
//             selects: [
//                 {
//                     name:     "Transaction",
//                     packages: {
//                         schema: "@monye.one/transaction",
//                     },
//                 },
//             ],
//         },
//     })
// );
