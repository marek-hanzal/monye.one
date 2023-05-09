import {type CalendarEventSource, type IMonth} from "@leight/calendar";
import {DateTime} from "@leight/i18n";
import {DateInline} from "@leight/i18n-client";
import {classNames} from "@leight/utils-client";
import {Button, Grid, Group, Text} from "@mantine/core";
import {IconChevronLeft, IconChevronRight} from "@tabler/icons-react";
import {type PropsWithChildren} from "react";
import {MonthsOfStore} from "../context";
import {CalendarShell, type ICalendarShellProps} from "./CalendarShell";

export type IMonthsProps<TSource extends CalendarEventSource = CalendarEventSource> = PropsWithChildren<Omit<ICalendarShellProps<TSource>, "children" | "onClick"> & {
    onClick?(props: IIMonthsProps.IOnClickProps): void;
}>;

export namespace IIMonthsProps {
    export interface IOnClickProps {
        month: IMonth;
    }
}

export const Months = <TSource extends CalendarEventSource = CalendarEventSource>(
    {
        children,
        onClick,
        ...props
    }: IMonthsProps<TSource>) => {
    const {months: {months, isCurrent, date}, today, prevYear, nextYear} = MonthsOfStore.use(({months, today, prevYear, nextYear}) => ({months, today, prevYear, nextYear}));
    const columnCount = 4;
    const rowCount = months.length / columnCount;
    return <CalendarShell
        controlsTopLeft={<Group spacing={"sm"}>
            <Button.Group>
                <Button
                    size={"sm"}
                    variant={"subtle"}
                    onClick={() => prevYear()}
                    leftIcon={<IconChevronLeft/>}
                >
                    <DateInline
                        date={date.minus({year: 1})}
                        options={{year: "numeric"}}
                    />
                </Button>
            </Button.Group>
        </Group>}
        controlsTopMiddle={<Group spacing={"sm"}>
            <Button
                variant={"subtle"}
                onClick={() => today()}
                disabled={isCurrent}
            >
                <Text c={"dimmed"}>
                    {isCurrent ?
                        <DateInline date={DateTime.now()} options={{day: "numeric", month: "long", year: "numeric"}}/> :
                        <DateInline date={date} options={{year: "numeric"}}/>
                    }
                </Text>
            </Button>
        </Group>}
        controlsTopRight={<Group spacing={"sm"}>
            <Button.Group>
                <Button
                    size={"sm"}
                    variant={"subtle"}
                    onClick={() => nextYear()}
                    rightIcon={<IconChevronRight/>}
                >
                    <DateInline
                        date={date.plus({year: 1})}
                        options={{year: "numeric"}}
                    />
                </Button>
            </Button.Group>
        </Group>}
        {...props}
    >
        {({classes}) => <>
            {Array.from({length: rowCount}, (_, row) => <Grid
                key={`month${row}`}
                columns={columnCount}
                className={classNames(
                    classes.calendarGrid,
                    classes.row,
                )}
                m={0}
            >
                {Array.from({length: columnCount}, (_, column) => {
                    const month = months[(row * columnCount) + column];
                    if (!month) {
                        return null;
                    }
                    return <Grid.Col
                        key={month.id}
                        span={1}
                        className={classNames(
                            classes.cell,
                            classes.monthCell,
                            month.isCurrent ? classes.currentMonth : undefined,
                        )}
                        style={onClick ? {cursor: "pointer"} : undefined}
                        onClick={() => onClick?.({month})}
                    >
                        {month.name}
                    </Grid.Col>;
                })}
            </Grid>)}
            {children}
        </>}
    </CalendarShell>;
};
