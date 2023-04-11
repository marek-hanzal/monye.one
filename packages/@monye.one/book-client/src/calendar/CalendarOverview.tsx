import {type IDateRange}            from "@leight/calendar";
import {
    CalendarProvider,
    WeeksOfStore
}                                   from "@leight/calendar-client";
import {Paper}                      from "@leight/mantine";
import {
    TransactionFilterStore,
    TransactionQueryProvider,
    TransactionTable
}                                   from "@monye.one/transaction-client";
import {
    type FC,
    useCallback,
    useEffect
}                                   from "react";
import {CalendarEventQueryProvider} from "../sdk";
import {BookCalendar}               from "./BookCalendar";

export interface ICalendarOverviewProps {
}

export const CalendarOverview: FC<ICalendarOverviewProps> = () => {
    const {weeks}     = WeeksOfStore.useState(({weeks}) => ({weeks}));
    const {setFilter} = TransactionFilterStore.useState(({setFilter}) => ({setFilter}));

    const $setFilter = useCallback(({range: {from, to}, withIncome = false, withOutcome = false}: { range: IDateRange; withIncome?: boolean; withOutcome?: boolean }) => {
        setFilter({
            AND: [
                     {
                         date: {gte: from.toJSDate()},
                     },
                     {
                         date: {lte: to.toJSDate()},
                     },
                     withIncome ? {
                         amount: {
                             gt: 0,
                         },
                     } : undefined,
                     withOutcome ? {
                         amount: {
                             lt: 0,
                         },
                     } : undefined,
                 ].filter(Boolean),
        });
    }, []);

    useEffect(() => {
        $setFilter({
            range: {from: weeks.start, to: weeks.end},
        });
    }, []);

    return <>
        <Paper>
            <CalendarEventQueryProvider>
                <BookCalendar
                    day={{
                        onIncomeClick:  ({range}) => {
                            $setFilter({range, withIncome: true, withOutcome: false});
                        },
                        onOutcomeClick: ({range}) => {
                            $setFilter({range, withIncome: false, withOutcome: true});
                        }
                    }}
                    month={{
                        onIncomeClick:  ({range}) => {
                            $setFilter({range, withIncome: true, withOutcome: false});
                        },
                        onOutcomeClick: ({range}) => {
                            $setFilter({range, withIncome: false, withOutcome: true});
                        }
                    }}
                    onChange={({weeks}) => {

                        $setFilter({
                            range: {from: weeks.start, to: weeks.end},
                        });
                    }}
                />
            </CalendarEventQueryProvider>
        </Paper>
        <TransactionTable/>
    </>;
};

export interface ICalendarOverviewProviderProps {

}

export const CalendarOverviewProvider: FC<ICalendarOverviewProviderProps> = () => {
    return <TransactionQueryProvider
        defaultSort={{
            date: "desc",
        }}
    >
        <CalendarProvider>
            <CalendarOverview/>
        </CalendarProvider>
    </TransactionQueryProvider>;
};
