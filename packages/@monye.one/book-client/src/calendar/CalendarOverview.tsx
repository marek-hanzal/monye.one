import {type IDateRange}            from "@leight/calendar";
import {
    CalendarProvider,
    WeeksOfStore
}                                   from "@leight/calendar-client";
import {Translation}                from "@leight/i18n-client";
import {Paper}                      from "@leight/mantine";
import {
    Tabs,
    ThemeIcon
}                                   from "@mantine/core";
import {
    TransactionFilterStore,
    TransactionQueryProvider,
    TransactionTable
}                                   from "@monye.one/transaction-client";
import {
    IconCalendar,
    IconCash
}                                   from "@tabler/icons-react";
import {
    type FC,
    useCallback,
    useEffect,
    useState
}                                   from "react";
import {CalendarEventQueryProvider} from "../sdk";
import {BookCalendar}               from "./BookCalendar";

export interface ICalendarOverviewProps {
}

export const CalendarOverview: FC<ICalendarOverviewProps> = () => {
    const [tab, setTab] = useState<string | null>("calendar");
    const {weeks}       = WeeksOfStore.useState(({weeks}) => ({weeks}));
    const {setFilter}   = TransactionFilterStore.useState(({setFilter}) => ({setFilter}));

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
            <Tabs
                value={tab}
                onTabChange={setTab}
            >
                <Tabs.List>
                    <Tabs.Tab
                        value={"calendar"}
                        icon={<ThemeIcon
                            variant={"light"}
                            color={"gray"}
                        >
                            <IconCalendar/>
                        </ThemeIcon>}
                    >
                        <Translation namespace={"book"} label={"calendar-overview.calendar.tab"}/>
                    </Tabs.Tab>
                    <Tabs.Tab
                        value={"transactions"}
                        icon={<ThemeIcon
                            variant={"light"}
                            color={"gray"}
                        >
                            <IconCash/>
                        </ThemeIcon>}
                    >
                        <Translation namespace={"book"} label={"calendar-overview.transactions.tab"}/>
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value={"calendar"}>
                    <CalendarEventQueryProvider>
                        <BookCalendar
                            day={{
                                onIncomeClick:  ({range}) => {
                                    $setFilter({range, withIncome: true, withOutcome: false});
                                    setTab("transactions");
                                },
                                onOutcomeClick: ({range}) => {
                                    $setFilter({range, withIncome: false, withOutcome: true});
                                    setTab("transactions");
                                }
                            }}
                            month={{
                                onIncomeClick:  ({range}) => {
                                    $setFilter({range, withIncome: true, withOutcome: false});
                                    setTab("transactions");
                                },
                                onOutcomeClick: ({range}) => {
                                    $setFilter({range, withIncome: false, withOutcome: true});
                                    setTab("transactions");
                                }
                            }}
                            onChange={({weeks}) => {
                                $setFilter({
                                    range: {from: weeks.start, to: weeks.end},
                                });
                            }}
                        />
                    </CalendarEventQueryProvider>
                </Tabs.Panel>
                <Tabs.Panel value={"transactions"}>
                    <TransactionTable
                        pagination={{
                            hideOnSingle: true,
                        }}
                    />
                </Tabs.Panel>
            </Tabs>
        </Paper>
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
