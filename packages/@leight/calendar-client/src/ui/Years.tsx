import {
    type ICalendarEventSourceSchema,
    type IYear
}                               from "@leight/calendar";
import {DateInline}             from "@leight/i18n-client";
import {classNames}             from "@leight/utils-client";
import {
    Button,
    Grid,
    Group,
    Text
}                               from "@mantine/core";
import {
    IconChevronLeft,
    IconChevronRight,
    IconChevronsLeft,
    IconChevronsRight
}                               from "@tabler/icons-react";
import {type PropsWithChildren} from "react";
import {YearsOfStore}           from "../context";
import {DateRageInline}         from "../inline";
import {
    CalendarShell,
    type ICalendarShellProps
}                               from "./CalendarShell";

export type IYearsProps<TSourceSchema extends ICalendarEventSourceSchema = ICalendarEventSourceSchema> = PropsWithChildren<Omit<ICalendarShellProps<TSourceSchema>, "children" | "onClick"> & {
    onClick?(props: IYearsProps.IOnClickProps): void;
}>;

export namespace IYearsProps {
    export interface IOnClickProps {
        year: IYear;
    }
}

export const Years = <TSourceSchema extends ICalendarEventSourceSchema = ICalendarEventSourceSchema>(
    {
        children,
        onClick,
        ...props
    }: IYearsProps<TSourceSchema>) => {
    const {
        years: {
                   years,
                   isCurrent,
                   start,
                   end,
                   columns,
                   rows,
                   count,
               },
        today,
        prevYear,
        nextYear,
        prevYears,
        nextYears,
    } = YearsOfStore.use();
    return <CalendarShell
        controlsTopLeft={<Group spacing={"sm"}>
            <Button.Group>
                <Button
                    size={"sm"}
                    variant={"subtle"}
                    onClick={() => prevYears()}
                    leftIcon={<IconChevronsLeft/>}
                >
                    <DateInline
                        date={start.minus({year: count})}
                        options={{year: "numeric"}}
                    />
                </Button>
                <Button
                    size={"sm"}
                    variant={"subtle"}
                    onClick={() => prevYear()}
                    leftIcon={<IconChevronLeft/>}
                >
                    <DateInline
                        date={start.minus({year: 1})}
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
                    <DateRageInline
                        start={start}
                        end={end}
                        startOptions={{year: "numeric"}}
                        endOptions={{year: "numeric"}}
                    />
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
                        date={end.plus({year: 1})}
                        options={{year: "numeric"}}
                    />
                </Button>
                <Button
                    size={"sm"}
                    variant={"subtle"}
                    onClick={() => nextYears()}
                    leftIcon={<IconChevronsRight/>}
                >
                    <DateInline
                        date={end.plus({year: count})}
                        options={{year: "numeric"}}
                    />
                </Button>
            </Button.Group>
        </Group>}
        {...props}
    >
        {({classes}) => <>
            {Array.from({length: rows}, (_, row) => <Grid
                key={`year${row}`}
                columns={columns}
                className={classNames(
                    classes.calendarGrid,
                    classes.row,
                )}
                m={0}
            >
                {Array.from({length: columns}, (_, column) => {
                    const year = years[(row * columns) + column];
                    if (!year) {
                        return null;
                    }
                    return <Grid.Col
                        key={year.id}
                        span={1}
                        className={classNames(
                            classes.cell,
                            classes.yearCell,
                            year.isCurrent ? classes.currentYear : undefined,
                        )}
                        style={onClick ? {cursor: "pointer"} : undefined}
                        onClick={() => onClick?.({year})}
                    >
                        {year.name}
                    </Grid.Col>;
                })}
            </Grid>)}
            {children}
        </>}
    </CalendarShell>;
};
