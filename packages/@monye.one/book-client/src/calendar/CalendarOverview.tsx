import {type IDateRange} from "@leight/calendar";
import {
    CalendarProvider,
    WeeksOfStore
}                        from "@leight/calendar-client";
import {
    FulltextProvider,
    FulltextStoreContext
}                        from "@leight/filter-client";
import {Translation}     from "@leight/i18n-client";
import {Paper}           from "@leight/mantine";
import {
    Group,
    Tabs,
    ThemeIcon
}                        from "@mantine/core";
import {
    SumByInline,
    TransactionQueryProvider,
    TransactionSourceStore,
    TransactionTable
}                        from "@monye.one/transaction-client";
import {
    IconCalendar,
    IconCash
}                        from "@tabler/icons-react";
import {
    type FC,
    useCallback,
    useEffect,
    useState
}                        from "react";
import {
    CalendarEventQueryProvider,
    CalendarEventSourceStore
}                        from "../sdk";
import {BookCalendar}    from "./BookCalendar";

type IFilterRange = {
    fulltext: string | undefined | null;
    range: IDateRange;
    withIncome?: boolean;
    withOutcome?: boolean;
}

export interface ICalendarOverviewProps {
}

export const CalendarOverview: FC<ICalendarOverviewProps> = () => {
    const [tab, setTab]                                                  = useState<string | null>("calendar");
    const {fulltext}                                                     = FulltextStoreContext.useState(({fulltext}) => ({fulltext}));
    const {weeks}                                                        = WeeksOfStore.useState(({weeks}) => ({weeks}));
    const {transactionFilterId, transactionFilter, setTransactionFilter} = TransactionSourceStore.Filter.useState(({id, filter, setFilter}) => ({transactionFilterId: id, transactionFilter: filter, setTransactionFilter: setFilter}));
    const {setCalendarEventShallowFilter}                                = CalendarEventSourceStore.Filter.useState(({setShallowFilter}) => ({setCalendarEventShallowFilter: setShallowFilter}));

    const $setFilter = useCallback(({fulltext, range: {from, to}, withIncome = false, withOutcome = false}: IFilterRange) => {
        setTransactionFilter({
            fulltext:  fulltext || undefined,
            withRange: {
                from: from.toUTC().toJSDate(),
                to:   to.toUTC().toJSDate(),
            },
            withIncome,
            withOutcome,
        });
    }, []);

    useEffect(() => {
        setCalendarEventShallowFilter({
            withTransaction: transactionFilter,
        });
    }, [transactionFilterId]);

    useEffect(() => {
        $setFilter({
            range: {from: weeks.start, to: weeks.end},
            fulltext,
        });
    }, []);

    return <>
        <Paper>
            <Tabs
                value={tab}
                onTabChange={setTab}
            >
                <Group
                    position={"apart"}
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
                    <SumByInline/>
                </Group>
                <Tabs.Panel value={"calendar"}>
                    <BookCalendar
                        mt={"sm"}
                        day={{
                            onIncomeClick:  ({range}) => {
                                $setFilter({fulltext, range, withIncome: true, withOutcome: false});
                                setTab("transactions");
                            },
                            onOutcomeClick: ({range}) => {
                                $setFilter({fulltext, range, withIncome: false, withOutcome: true});
                                setTab("transactions");
                            }
                        }}
                        month={{
                            onIncomeClick:  ({range}) => {
                                $setFilter({fulltext, range, withIncome: true, withOutcome: false});
                                setTab("transactions");
                            },
                            onOutcomeClick: ({range}) => {
                                $setFilter({fulltext, range, withIncome: false, withOutcome: true});
                                setTab("transactions");
                            }
                        }}
                        onChange={({weeks}) => {
                            $setFilter({
                                withIncome:  transactionFilter.withIncome,
                                withOutcome: transactionFilter.withOutcome,
                                fulltext,
                                range:       {from: weeks.start, to: weeks.end},
                            });
                        }}
                    />
                </Tabs.Panel>
                <Tabs.Panel value={"transactions"}>
                    <TransactionTable
                        pagination={{
                            position:     [
                                "bottom"
                            ],
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
    return <FulltextProvider>
        <CalendarEventQueryProvider
            cursorCacheTime={60}
        >
            <TransactionQueryProvider
                defaultSort={{
                    date: "desc",
                }}
                cursorCacheTime={60}
            >
                <CalendarProvider>
                    <CalendarOverview/>
                </CalendarProvider>
            </TransactionQueryProvider>
        </CalendarEventQueryProvider>
    </FulltextProvider>;
};
