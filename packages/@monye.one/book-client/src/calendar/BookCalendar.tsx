import {
    Calendar,
    type ICalendarProps,
    WeeksOfStore
}                             from "@leight/calendar-client";
import {FulltextStoreContext} from "@leight/filter-client";
import {Fulltext}             from "@leight/mantine";
import {
    CalendarEventSourceSchema,
    type ICalendarEventSourceSchemaType
}                             from "@monye.one/book";
import {
    type FC,
    useEffect
}                             from "react";
import {
    CalendarEventSource,
    CalendarEventSourceStore
}                             from "../sdk";
import {
    type IIncomeOutcomeProps,
    IncomeOutcome
}                             from "./IncomeOutcome";

export interface IBookCalendarProps extends Omit<ICalendarProps<ICalendarEventSourceSchemaType>, "useEventState"> {
    day?: {
        onIncomeClick?: IIncomeOutcomeProps["onIncomeClick"];
        onOutcomeClick?: IIncomeOutcomeProps["onOutcomeClick"];
    };
    month?: {
        onIncomeClick?: IIncomeOutcomeProps["onIncomeClick"];
        onOutcomeClick?: IIncomeOutcomeProps["onOutcomeClick"];
    };
}

export const BookCalendar: FC<IBookCalendarProps> = (
    {
        day:   $day,
        month: $month,
        ...    props
    }) => {
    const {weeks}            = WeeksOfStore.useState(({weeks}) => ({weeks}));
    const fulltextStore      = FulltextStoreContext.useOptionalState();
    const {setShallowFilter} = CalendarEventSourceStore.Filter.useState(({setShallowFilter}) => ({setShallowFilter}));

    useEffect(() => {
        if (!fulltextStore) {
            return;
        }
        setShallowFilter({fulltext: fulltextStore?.fulltext || undefined});
    }, [fulltextStore?.fulltext]);

    return <CalendarEventSource>
        <Fulltext
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
            controlsBottomRight={({source}) => <IncomeOutcome
                range={{
                    from: weeks.start,
                    to:   weeks.end,
                }}
                events={source?.dtos}
                withSum
                spacing={"sm"}
                {...$month}
            />}
            {...props}
        />
    </CalendarEventSource>;
};
