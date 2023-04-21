import {type ICalendarEventSourceSchemaType} from "@leight/calendar";
import {DateInline}                          from "@leight/i18n-client";
import {
    ActionIcon,
    Box,
    Button,
    Overlay
}                                            from "@mantine/core";
import {
    IconCalendarSearch,
    IconX
}                                            from "@tabler/icons-react";
import {useState}                            from "react";
import {
    MonthsOfStore,
    WeeksOfStore,
    YearsOfStore
}                                            from "../context";
import {Months}                              from "./Months";
import {
    type IWeeksProps,
    Weeks
}                                            from "./Weeks";
import {Years}                               from "./Years";

export interface ICalendarProps<TSourceSchema extends ICalendarEventSourceSchemaType = ICalendarEventSourceSchemaType> extends IWeeksProps<TSourceSchema> {
    withControls?: boolean;
    compact?: boolean;
}

export const Calendar = <TSourceSchema extends ICalendarEventSourceSchemaType = ICalendarEventSourceSchemaType>(
    {
        onClick,
        withControls = true,
        ...props
    }: ICalendarProps<TSourceSchema>) => {
    const {weeksOf, weeks}              = WeeksOfStore.useState(({weeksOf, weeks}) => ({weeksOf, weeks}));
    const {monthsOf}                    = MonthsOfStore.useState(({monthsOf}) => ({monthsOf}));
    const {yearsOf}                     = YearsOfStore.useState(({yearsOf}) => ({yearsOf}));
    const [selectMonth, setSelectMonth] = useState(false);
    const [selectYear, setSelectYear]   = useState(false);
    return <Box pos={"relative"}>
        <Weeks<TSourceSchema>
            onClick={onClick}
            withControls={withControls}
            controlsBottomMiddle={props.compact ? undefined : <Button.Group>
                <Button
                    compact={props.compact}
                    variant={"subtle"}
                    onClick={() => {
                        setSelectMonth(true);
                        monthsOf(weeks.date);
                    }}
                    leftIcon={<IconCalendarSearch/>}
                >
                    <DateInline date={weeks.date} options={{month: "long"}}/>
                </Button>
                <Button
                    compact={props.compact}
                    variant={"subtle"}
                    onClick={() => {
                        setSelectYear(true);
                        yearsOf(weeks.date);
                    }}
                    leftIcon={<IconCalendarSearch/>}
                >
                    <DateInline date={weeks.date} options={{year: "numeric"}}/>
                </Button>
            </Button.Group>}
            {...props}
        >
            {selectMonth && <Overlay color={"#FFF"} opacity={1}>
                <Months<TSourceSchema>
                    onClick={({month: {month}}) => {
                        weeksOf(month);
                        setSelectMonth(false);
                    }}
                    controlsBottomMiddle={<ActionIcon
                        variant={"subtle"}
                        onClick={() => setSelectMonth(false)}
                    >
                        <IconX/>
                    </ActionIcon>}
                    compact={props.compact}
                />
            </Overlay>}
            {selectYear && <Overlay color={"#FFF"} opacity={1}>
                <Years<TSourceSchema>
                    onClick={({year: {year}}) => {
                        weeksOf(year);
                        setSelectYear(false);
                    }}
                    controlsBottomMiddle={<ActionIcon
                        variant={"subtle"}
                        onClick={() => setSelectYear(false)}
                    >
                        <IconX/>
                    </ActionIcon>}
                    compact={props.compact}
                />
            </Overlay>}
        </Weeks>
    </Box>;
};
