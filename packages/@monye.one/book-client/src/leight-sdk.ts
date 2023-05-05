import {withSdk} from "@leight/sdk";

void withSdk([]);

// void withSdk(
//     withClientSourceGenerators({
//         SourceStore:    {
//             entities: [
//                 {
//                     name:     "CalendarEvent",
//                     packages: {
//                         schema: "@monye.one/book",
//                     },
//                 },
//             ],
//         },
//         SourceProvider: {
//             entities: [
//                 {
//                     name:     "CalendarEvent",
//                     packages: {
//                         schema: "@monye.one/book",
//                     },
//                 },
//             ],
//         },
//         Trpc:           {
//             entities: [
//                 {
//                     name:     "CalendarEvent",
//                     withTrpc: {
//                         path:         "book.calendar.event",
//                         package:      "@monye.one/trpc-client",
//                         invalidators: [
//                             "book.calendar.event.source.query",
//                             "book.calendar.event.source.count",
//                         ],
//                     },
//                     packages: {
//                         schema: "@monye.one/book",
//                     },
//                 },
//             ],
//         }
//     })
// );
