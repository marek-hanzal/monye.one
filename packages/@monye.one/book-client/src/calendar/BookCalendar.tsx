import {
    Calendar,
    type ICalendarProps
}                            from "@leight/calendar-client";
import {Fulltext}            from "@leight/mantine";
import {FulltextStore}       from "@leight/source-client";
import {Grid}                from "@mantine/core";
import {
    CalendarEventSourceSchema,
    type ICalendarEventSourceSchema
}                            from "@monye.one/book";
import {
    TransactionFilter,
    TransactionSource
}                            from "@monye.one/transaction-client";
import {
    type FC,
    useEffect
}                            from "react";
import {CalendarEventSource} from "../sdk";
import {
    type IIncomeOutcomeProps,
    IncomeOutcome
}                            from "./IncomeOutcome";

export interface IBookCalendarProps extends Omit<ICalendarProps<ICalendarEventSourceSchema>, "useEventState"> {
    day?: {
        onIncomeClick?: IIncomeOutcomeProps["onIncomeClick"];
        onOutcomeClick?: IIncomeOutcomeProps["onOutcomeClick"];
        onSumClick?: IIncomeOutcomeProps["onSumClick"];
    };
    month?: {
        onIncomeClick?: IIncomeOutcomeProps["onIncomeClick"];
        onOutcomeClick?: IIncomeOutcomeProps["onOutcomeClick"];
    };
}

export const BookCalendar: FC<IBookCalendarProps> = (
    {
        day: $day,
        ...  props
    }) => {
    const fulltextStore = FulltextStore.use$();
    const {withShallowFilter} = CalendarEventSource.query.use(({withShallowFilter}) => ({withShallowFilter}));

    useEffect(() => {
        if (!fulltextStore) {
            return;
        }
        withShallowFilter({fulltext: fulltextStore?.fulltext || undefined});
    }, [fulltextStore?.fulltext]);

    return <>
        <Grid align={"center"} mt={"sm"}>
            <Grid.Col span={"auto"}>
                <Fulltext
                    Source={TransactionSource}
                    withTranslation={{
                        namespace: "book",
                        label:     "calendar",
                    }}
                />
            </Grid.Col>
            <Grid.Col span={"content"}>
                <TransactionFilter
                    hidden={[
                        "from",
                        "to",
                        "rangeOf",
                    ]}
                />
            </Grid.Col>
        </Grid>
        <Calendar<ICalendarEventSourceSchema>
            events={{
                schema: CalendarEventSourceSchema["DtoSchema"],
                Source: CalendarEventSource,
            }}
            renderDayInline={({
                                  day,
                                  events
                              }) => <IncomeOutcome
                range={{
                    from: day.day.startOf("day"),
                    to:   day.day.endOf("day"),
                }}
                events={events}
                {...$day}
            />}
            {...props}
        />
    </>;
};
