import {
    type ICalendarEventSourceSchema,
    type IDay,
    type IWeeks
}                        from "@leight/calendar";
import {DateTime}        from "@leight/i18n";
import {DateInline}      from "@leight/i18n-client";
import {type SourceType} from "@leight/source";
import {FulltextStore}   from "@leight/source-client";
import {classNames}      from "@leight/utils-client";
import {
    ActionIcon,
    Button,
    Grid,
    Group,
    Stack,
    Text
}                        from "@mantine/core";
import {
    IconCalendarEvent,
    IconChevronLeft,
    IconChevronRight,
    IconChevronsLeft,
    IconChevronsRight
}                        from "@tabler/icons-react";
import {
    type PropsWithChildren,
    type ReactNode,
    useEffect,
    useState
}                        from "react";
import {WeeksOfStore}    from "../context";
import {
    CalendarShell,
    type ICalendarShellProps
}                        from "./CalendarShell";

export type IWeeksProps<TSourceSchema extends ICalendarEventSourceSchema = ICalendarEventSourceSchema> = PropsWithChildren<Omit<ICalendarShellProps<TSourceSchema>, "children" | "onClick" | "onChange"> & {
    onClick?(props: IWeeksProps.IOnClickProps): void;
    onChange?(props: IWeeksProps.IOnChangeProps): void;
    renderDayInline?(props: IWeeksProps.IRenderInlineProps<TSourceSchema>): ReactNode;

    weekCountSize?: number;
    defaultWithWeekNo?: boolean;
    columnSize?: number;
    highlightToday?: boolean;
}>

export namespace IWeeksProps {
    export interface IOnClickProps {
        day: IDay;
    }

    export interface IOnChangeProps {
        weeks: IWeeks;
    }

    export interface IRenderInlineProps<
        TSourceSchema extends ICalendarEventSourceSchema,
        TSourceType extends SourceType<TSourceSchema> = SourceType<TSourceSchema>
    > {
        schema: TSourceSchema["DtoSchema"];
        day: IDay;
        events: TSourceType["Dto"][];
        compact?: boolean;
    }
}

export const Weeks = <
    TSourceSchema extends ICalendarEventSourceSchema = ICalendarEventSourceSchema,
    TSourceType extends SourceType<TSourceSchema> = SourceType<TSourceSchema>
>(
    {
        onClick,
        onChange: $onChange = () => null,
        events,
        renderDayInline,
        highlightToday = true,
        defaultWithWeekNo = false,
        weekCountSize = 2,
        columnSize = 3,
        children,
        ...props
    }: IWeeksProps<TSourceSchema>) => {
    const {
        id,
        nextMonth,
        prevMonth,
        prevYear,
        nextYear,
        today,
        weeks: {
                   weeks,
                   list,
                   start,
                   end,
                   isCurrent,
               }
    } = WeeksOfStore.use();
    const source = events?.Source.use();
    const filter = events?.Source.query.use();
    const fulltextStore = FulltextStore.use$();
    const $events = events && source?.data
        .reduce<Record<string, TSourceType["Dto"][]>>((prev, current) => {
            const stamp = DateTime.fromJSDate(current.date).toLocaleString({
                day:   "numeric",
                month: "numeric",
                year:  "numeric"
            });
            prev[stamp] = (prev[stamp] || []).concat(current);
            return prev;
        }, {});
    const [withWeeks, setWithWeeks] = useState(defaultWithWeekNo);

    useEffect(() => {
        filter?.withFilter({
            fulltext:  fulltextStore?.fulltext || undefined,
            withRange: {
                from: start.toUTC().toJSDate(),
                to:   end.toUTC().toJSDate(),
            },
        });
    }, [
        id,
    ]);

    const onChange: IWeeksProps<TSourceSchema>["onChange"] = props => {
        filter?.withFilter({
            fulltext:  fulltextStore?.fulltext || undefined,
            withRange: {
                from: props.weeks.start.toUTC().toJSDate(),
                to:   props.weeks.end.toUTC().toJSDate(),
            },
        });
        $onChange?.(props);
    };

    /**
     * This is specific for Mantine Grid: compute number of columns to render.
     */
    const columnCount = (list.length * columnSize) + (withWeeks ? weekCountSize : 0);

    return <CalendarShell
        events={events}
        controlsTopLeft={<Group spacing={"sm"}>
            <Button.Group>
                <Button
                    compact={props.compact}
                    size={"sm"}
                    variant={"subtle"}
                    onClick={() => onChange({weeks: prevMonth()})}
                    leftIcon={<IconChevronLeft/>}
                >
                    <DateInline
                        date={start.minus({month: 1})}
                        options={{month: "long"}}
                    />
                </Button>
                <Button
                    compact={props.compact}
                    size={"sm"}
                    variant={"subtle"}
                    onClick={() => onChange({weeks: prevYear()})}
                    leftIcon={<IconChevronsLeft/>}
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
                compact={props.compact}
                variant={"subtle"}
                onClick={() => onChange({weeks: today()})}
                disabled={isCurrent}
            >
                <Text c={"dimmed"}>
                    {isCurrent ?
                        <DateInline date={DateTime.now()} options={{
                            day:   "numeric",
                            month: "long",
                            year:  "numeric"
                        }}/> :
                        <DateInline date={start} options={{
                            month: "long",
                            year:  "numeric"
                        }}/>
                    }
                </Text>
            </Button>
        </Group>}
        controlsTopRight={<Group spacing={"sm"}>
            <Button.Group>
                <Button
                    compact={props.compact}
                    size={"sm"}
                    variant={"subtle"}
                    onClick={() => onChange({weeks: nextYear()})}
                    rightIcon={<IconChevronsRight/>}
                >
                    <DateInline
                        date={start.plus({year: 1})}
                        options={{year: "numeric"}}
                    />
                </Button>
                <Button
                    compact={props.compact}
                    size={"sm"}
                    variant={"subtle"}
                    onClick={() => onChange({weeks: nextMonth()})}
                    rightIcon={<IconChevronRight/>}
                >
                    <DateInline
                        date={start.plus({month: 1})}
                        options={{month: "long"}}
                    />
                </Button>
            </Button.Group>
        </Group>}
        controlsBottomLeft={props.compact ? undefined : <ActionIcon
            variant={"subtle"}
            onClick={() => setWithWeeks(weeks => !weeks)}
        >
            <IconCalendarEvent/>
        </ActionIcon>}
        {...props}
    >
        {({classes}) => <>
            {/*
                First of all: render header with all days of the week; they're already localised from
                the calendar, so it's just simple render here.
             */}
            <Grid
                columns={columnCount}
                className={classNames(
                    classes.calendarGrid,
                    classes.row,
                )}
                m={0}
            >
                {withWeeks && <Grid.Col
                    span={weekCountSize}
                    className={classNames(
                        classes.header,
                        props.compact ? "compact" : undefined,
                    )}
                >
                    <ActionIcon variant={"light"}>
                        <IconCalendarEvent/>
                    </ActionIcon>
                </Grid.Col>}
                {list.map(day => <Grid.Col
                    key={`day-${day}`}
                    span={columnSize}
                    className={classNames(
                        classes.header,
                        props.compact ? "compact" : undefined,
                    )}
                >
                    {day}
                </Grid.Col>)}
            </Grid>
            {/*
                Quite simple stuff: take all weeks compute by the calendar and render them. That's all
             */}
            {weeks.map(({
                            days,
                            number,
                            isCurrent,
                            id
                        }) => <Grid
                key={id}
                columns={columnCount}
                className={classNames(
                    classes.calendarGrid,
                    classes.row,
                    isCurrent ? classes.currentWeek : undefined,
                )}
                m={0}
            >
                {withWeeks && <Grid.Col
                    span={weekCountSize}
                >
                    {number}.
                </Grid.Col>}
                {/*
                    Grid is already properly setup (number of columns), so render day by day as a calendar says.
                 */}
                {days.map(day => props.compact ? <>
                    <Grid.Col
                        key={day.id}
                        span={columnSize}
                        className={classNames(
                            "compact",
                            classes.cell,
                            day.isCurrent && highlightToday ? classes.currentDay : undefined,
                            day.isOutOfRange ? classes.outOfRange : classes.inRange,
                        )}
                        style={onClick ? {cursor: "pointer"} : undefined}
                        onClick={() => onClick?.({day})}
                    >
                        {day.day.day}
                    </Grid.Col>
                </> : <Grid.Col
                    key={day.id}
                    span={columnSize}
                    className={classNames(
                        classes.cell,
                        day.isCurrent && highlightToday ? classes.currentDay : undefined,
                        day.isOutOfRange ? classes.outOfRange : classes.inRange,
                    )}
                    style={onClick ? {cursor: "pointer"} : undefined}
                    onClick={() => onClick?.({day})}
                >
                    <Stack
                        justify={"space-between"}
                        style={{
                            height:  "100%",
                            padding: "0 0.3em"
                        }}
                    >
                        <Group position={"apart"}>
                            <div></div>
                            {/*<Group spacing={0}>*/}
                            {/*    <ActionIcon size={"sm"}>*/}
                            {/*        <IconCalendarEvent/>*/}
                            {/*    </ActionIcon>*/}
                            {/*</Group>*/}
                            {day.day.day}
                        </Group>
                        {renderDayInline && events ? <div>
                            {renderDayInline({
                                schema:  events.schema,
                                day,
                                events:  $events?.[day.id] || [],
                                compact: props.compact,
                            })}
                        </div> : null}
                    </Stack>
                </Grid.Col>)}
            </Grid>)}
            {children}
        </>}
    </CalendarShell>;
};
