import {
    DateTime,
    Info,
    Interval
}                from "@leight/i18n";
import {Date}    from "@leight/i18n-client";
import {
    Grid,
    Group
}                from "@mantine/core";
import {type FC} from "react";

export interface ICalendarProps {
}

export const Calendar: FC<ICalendarProps> = () => {
    const now       = DateTime.now();
    const weekStart = now.startOf("month").weekNumber - 1;
    const weekEnd   = now.endOf("month").weekNumber + 1;
    const dateStart = DateTime.fromObject({
        weekNumber: weekStart
    }).startOf("week");
    const dateEnd   = DateTime.fromObject({
        weekNumber: weekEnd,
    }).endOf("week");
    const interval  = Interval.fromDateTimes(dateStart, dateEnd);
    const calendar  = Array.from({length: interval.count("weeks")}, (_, week) => {
        const $week = DateTime.fromObject({weekNumber: weekStart + week});
        const id    = `week-${$week.weekNumber}`;
        return {
            id,
            week:    $week,
            number:  $week.weekNumber,
            current: $week.weekNumber === now.weekNumber,
            days:    Array.from({length: 7}, (_, day) => {
                const $day = $week.plus({day: day});
                return {
                    id:      `${id}-${day}`,
                    day:     $day,
                    current: !Math.floor(now.diff($day, "day").days),
                };
            }),
        };
    });

    return <>
        Calendar here!
        <Group>
            <span>from: <Date input={dateStart.toJSDate()}/></span>-
            <span>end: <Date input={dateEnd.toJSDate()}/></span>
        </Group>

        <Grid columns={(7 * 3) + 1}>
            <Grid.Col span={1}/>
            {Info.weekdays("long").map(day => <Grid.Col key={`day-${day}`} span={3}>{day}</Grid.Col>)}
        </Grid>
        {calendar.map(({days, number, current, id}) => <Grid
            key={id}
            columns={(7 * 3) + 1}
            style={current ? {backgroundColor: "#EEE"} : undefined}
        >
            <Grid.Col
                span={1}
            >
                {number}.
            </Grid.Col>
            {days.map(({day, current, id}) => <Grid.Col
                key={id}
                span={3}
                style={current ? {backgroundColor: "#ccc"} : undefined}
            >
                <Date input={day.toJSDate()}/>
            </Grid.Col>)}
        </Grid>)}
    </>;
};
