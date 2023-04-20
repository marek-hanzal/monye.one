import {DateTime}                        from "@leight/i18n";
import {
    $PrismaClient,
    PrismaClient
}                                        from "@leight/prisma";
import {type ICalendarEventSourceSchema} from "@monye.one/book";
import {CalendarEventBaseSource}         from "../sdk/BaseSource/CalendarEventBaseSource";

export class CalendarEventSourceEx extends CalendarEventBaseSource {
    static inject = [
        $PrismaClient,
    ];

    constructor(
        protected prismaClient: PrismaClient,
    ) {
        super();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async runCount(query: ICalendarEventSourceSchema["Query"]): Promise<number> {
        return 0;
    }

    async runQuery({filter}: ICalendarEventSourceSchema["Query"]): Promise<ICalendarEventSourceSchema["Entity"][]> {
        if (!filter) {
            return [];
        }
        const {from, to} = filter;
        return (await this.prismaClient.transaction.findMany({
            where: {
                AND: [
                    {
                        date: {
                            gte: from.toJSDate(),
                        },
                    },
                    {
                        date: {
                            lte: to.toJSDate(),
                        },
                    },
                ],
            },
        })).map(transaction => {
            const amount = transaction.amount.toNumber();
            return {
                id:      transaction.id,
                date:    DateTime.fromJSDate(transaction.date),
                amount,
                outcome: amount < 0 ? Math.abs(amount) : 0,
                income:  amount > 0 ? Math.abs(amount) : 0,
            };
        });
    }
}
