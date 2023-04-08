import {DateTime}                        from "@leight/i18n";
import {
    $PrismaClient,
    PrismaClient
}                                        from "@leight/prisma";
import {type ICalendarEventSourceSchema} from "@monye.one/book";
import {CalendarEventBaseSource}         from "../sdk/ServerBaseSource";

export class CalendarEventBaseSourceEx extends CalendarEventBaseSource {
    static inject = [
        $PrismaClient,
    ];

    constructor(
        protected prismaClient: PrismaClient,
    ) {
        super();
    }

    async runCount(query: ICalendarEventSourceSchema["Query"]): Promise<number> {
        return 0;
    }

    async runQuery(query: ICalendarEventSourceSchema["Query"]): Promise<ICalendarEventSourceSchema["Entity"][]> {
        return [
            {
                date: DateTime.now(),
                id:   "12345",
            },
            {
                date: DateTime.now(),
                id:   "123456",
            },
            {
                date: DateTime.now(),
                id:   "123457",
            },
            {
                date: DateTime.now().minus({day: 2}),
                id:   "123453",
            },
            {
                date: DateTime.now().plus({day: 4}),
                id:   "123459",
            },
        ];
    }
}
