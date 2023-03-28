import {
    DateTime,
    Info,
    useCalendar
}                from "@leight/i18n";
import {Date}    from "@leight/i18n-client";
import {
    createStyles,
    Grid,
    Group
}                from "@mantine/core";
import {type FC} from "react";

const useStyles = createStyles(theme => ({
    currentWeek: {
        backgroundColor: theme.colors["gray"][2],
    },
    currentDay:  {
        backgroundColor: theme.colors["gray"][4],
    },
}));

export interface ICalendarProps {
}

export const Calendar: FC<ICalendarProps> = () => {
    const columnSize = 3;
    const columns    = (7 * columnSize) + 1;
    const {classes}  = useStyles();

    const {start, end, weeks} = useCalendar({
        input: DateTime.now().plus({month: 0}),
    });

    return <>
        Calendar here!
        <Group>
            <span>from: <Date input={start.toJSDate()}/></span>-
            <span>end: <Date input={end.toJSDate()}/></span>
        </Group>

        <Grid columns={columns}>
            <Grid.Col span={1}/>
            {Info.weekdays("long").map(day => <Grid.Col
                key={`day-${day}`}
                span={columnSize}
            >
                <h3>{day}</h3>
            </Grid.Col>)}
        </Grid>
        {weeks.map(({days, number, current, id}) => <Grid
            key={id}
            columns={columns}
            className={current ? classes.currentWeek : undefined}
        >
            <Grid.Col
                span={1}
            >
                {number}.
            </Grid.Col>
            {days.map(({day, current, id}) => <Grid.Col
                key={id}
                span={columnSize}
                className={current ? classes.currentDay : undefined}
            >
                <Date input={day.toJSDate()}/>
            </Grid.Col>)}
        </Grid>)}
    </>;
};
