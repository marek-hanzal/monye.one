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
    const input = DateTime.fromObject({month: 3});

    const dateStart = input.startOf("month").minus({week: 1});
    const dateEnd   = input.endOf("month").plus({week: 1});
    const weekStart = dateStart.startOf("week");
    const now       = DateTime.now();
    const calendar  = Array.from({length: Interval.fromDateTimes(dateStart, dateEnd).count("weeks")}, (_, week) => {
        const $week = weekStart.plus({week});
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
