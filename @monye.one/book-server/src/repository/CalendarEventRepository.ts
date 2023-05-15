import {$PrismaClient, decimalOf, PrismaClient} from "@leight/prisma";
import {type CalendarEventSource} from "@monye.one/book";
import {$TransactionRepository, type ITransactionRepository} from "@monye.one/transaction";
import {BaseCalendarEventRepository} from "../sdk";

export class CalendarEventRepository extends BaseCalendarEventRepository {
    static inject = [
        $PrismaClient,
        $TransactionRepository,
    ];

    constructor(
        protected prismaClient: PrismaClient,
        protected transactionRepository: ITransactionRepository,
    ) {
        super();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async runCount(query: CalendarEventSource["Type"]["Query"]): Promise<number> {
        return 0;
    }

    async runQuery({filter}: CalendarEventSource["Type"]["Query"]): Promise<CalendarEventSource["Type"]["Entity"][]> {
        if (!filter) {
            return [];
        }
        const {withTransaction, withRange, fulltext} = filter;
        return (await this.transactionRepository.query({
            filter: {
                ...withTransaction,
                withRange,
                fulltext,
            },
            cursor: {
                page: 0,
                size: 250,
            },
        })).map(transaction => {
            const amount = decimalOf(transaction.amount);
            return {
                id: transaction.id,
                date: transaction.date,
                amount,
                outcome: amount < 0 ? Math.abs(amount) : 0,
                income: amount > 0 ? Math.abs(amount) : 0,
            };
        });
    }
}
