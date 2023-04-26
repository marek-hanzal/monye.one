import {
    Calendar,
    type ICalendarProps
}                                 from "@leight/calendar-client";
import {Fulltext}                 from "@leight/mantine";
import {FulltextStoreContext}     from "@leight/source-client";
import {
    CalendarEventSourceSchema,
    type ICalendarEventSourceSchemaType
}                                 from "@monye.one/book";
import {TransactionSourceStore}   from "@monye.one/transaction-client";
import {
    type FC,
    useEffect
}                                 from "react";
import {CalendarEventSourceStore} from "../sdk";
import {
    type IIncomeOutcomeProps,
    IncomeOutcome
}                                 from "./IncomeOutcome";

export interface IBookCalendarProps extends Omit<ICalendarProps<ICalendarEventSourceSchemaType>, "useEventState"> {
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
    const fulltextStore      = FulltextStoreContext.useOptionalState();
    const {setShallowFilter} = CalendarEventSourceStore.Query.useState(({setShallowFilter}) => ({setShallowFilter}));

    useEffect(() => {
        if (!fulltextStore) {
            return;
        }
        setShallowFilter({fulltext: fulltextStore?.fulltext || undefined});
    }, [fulltextStore?.fulltext]);

    return <>
        <Fulltext
            SourceStore={TransactionSourceStore}
            withTranslation={{
                namespace: "book",
                label:     "calendar",
            }}
            mt={"sm"}
        />
        <Calendar<ICalendarEventSourceSchemaType>
            events={{
                schema:      CalendarEventSourceSchema["DtoSchema"],
                SourceStore: CalendarEventSourceStore,
            }}
            renderDayInline={({day, events}) => <IncomeOutcome
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
