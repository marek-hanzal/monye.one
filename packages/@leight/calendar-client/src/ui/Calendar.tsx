import {
    DateTime,
    Info,
    useCalendar
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
    const {start, end, weeks} = useCalendar({input: DateTime.fromObject({month: 1})});
    return <>
        Calendar here!
        <Group>
            <span>from: <Date input={start.toJSDate()}/></span>-
            <span>end: <Date input={end.toJSDate()}/></span>
        </Group>

        <Grid columns={(7 * 3) + 1}>
            <Grid.Col span={1}/>
            {Info.weekdays("long").map(day => <Grid.Col key={`day-${day}`} span={3}>{day}</Grid.Col>)}
        </Grid>
        {weeks.map(({days, number, current, id}) => <Grid
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
