import {type IDateRange}            from "@leight/calendar";
import {
    CalendarProvider,
    WeeksOfStore
}                                   from "@leight/calendar-client";
import {
    FulltextProvider,
    FulltextStoreContext
}                                   from "@leight/filter-client";
import {Translation}                from "@leight/i18n-client";
import {Paper}                      from "@leight/mantine";
import {
    Tabs,
    ThemeIcon
}                                   from "@mantine/core";
import {
    SumByInline,
    TransactionQueryProvider,
    TransactionSourceStore,
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

type IFilterRange = {
    fulltext: string | undefined | null;
    range: IDateRange;
    withIncome?: boolean;
    withOutcome?: boolean;
}

export interface ICalendarOverviewProps {
}

export const CalendarOverview: FC<ICalendarOverviewProps> = () => {
    const [tab, setTab] = useState<string | null>("calendar");
    const {fulltext}    = FulltextStoreContext.useState(({fulltext}) => ({fulltext}));
    const {weeks}       = WeeksOfStore.useState(({weeks}) => ({weeks}));
    const {setFilter}   = TransactionSourceStore.Filter.useState(({setFilter}) => ({setFilter}));

    const $setFilter = useCallback(({fulltext, range: {from, to}, withIncome = false, withOutcome = false}: IFilterRange) => {
        setFilter({
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
        $setFilter({
            range: {from: weeks.start, to: weeks.end},
            fulltext,
        });
    }, []);

    return <>
        <Paper>
            <SumByInline mt={"sm"}/>
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
                                fulltext,
                                range: {from: weeks.start, to: weeks.end},
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
        <CalendarEventQueryProvider>
            <TransactionQueryProvider
                defaultSort={{
                    date: "desc",
                }}
            >
                <CalendarProvider>
                    <CalendarOverview/>
                </CalendarProvider>
            </TransactionQueryProvider>
        </CalendarEventQueryProvider>
    </FulltextProvider>;
};
