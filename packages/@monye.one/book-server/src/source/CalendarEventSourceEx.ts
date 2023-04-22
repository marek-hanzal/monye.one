import {
    $PrismaClient,
    decimalOf,
    PrismaClient
}                                            from "@leight/prisma";
import {type ICalendarEventSourceSchemaType} from "@monye.one/book";
import {
    $TransactionSource,
    type ITransactionSource
}                                            from "@monye.one/transaction";
import {CalendarEventBaseSource}             from "../sdk/BaseSource/CalendarEventBaseSource";

export class CalendarEventSourceEx extends CalendarEventBaseSource {
    static inject = [
        $PrismaClient,
        $TransactionSource,
    ];

    constructor(
        protected prismaClient: PrismaClient,
        protected transactionSource: ITransactionSource,
    ) {
        super();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async runCount(query: ICalendarEventSourceSchemaType["Query"]): Promise<number> {
        return 0;
    }

    async runQuery({filter}: ICalendarEventSourceSchemaType["Query"]): Promise<ICalendarEventSourceSchemaType["Entity"][]> {
        if (!filter) {
            return [];
        }
        const {from, to} = filter;
        return (await this.transactionSource.query({
            filter: {
                withRange: {
                    from,
                    to,
                },
            },
        })).map(transaction => {
            const amount = decimalOf(transaction.amount);
            return {
                id:      transaction.id,
                date:    transaction.date,
                amount,
                outcome: amount < 0 ? Math.abs(amount) : 0,
                income:  amount > 0 ? Math.abs(amount) : 0,
            };
        });
    }
}
