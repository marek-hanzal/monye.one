import {type ICalendarEventSchema} from "@leight/calendar";
import {
    type InferSelectors,
    switchScheme
}                                  from "@leight/mantine";
import {
    type ISourceSchema,
    type IUseSourceState
}                                  from "@leight/source";
import {
    isCallable,
    withBool
}                                  from "@leight/utils";
import {
    BlockStore,
    classNames
}                                  from "@leight/utils-client";
import {
    Box,
    Container,
    createStyles,
    Grid,
    LoadingOverlay
}                                  from "@mantine/core";
import {
    type ComponentProps,
    type ReactNode
}                                  from "react";

const useStyles = createStyles(theme => ({
    calendar:       {
        userSelect: "none",
    },
    calendarGrid:   {
        border:         "1px solid",
        borderColor:    switchScheme(
            theme,
            theme.colors.gray[6],
            theme.colors.gray[4]
        ),
        borderBottom:   "none",
        borderRight:    "none",
        "&:last-child": {
            border:      "1px solid",
            borderColor: switchScheme(
                theme,
                theme.colors.gray[6],
                theme.colors.gray[4]
            ),
            borderRight: "none",
        },
    },
    controlsGrid:   {
        "& > div:last-child": {
            borderRight:      "1px solid",
            borderRightColor: switchScheme(
                theme,
                theme.colors.gray[6],
                theme.colors.gray[4]
            ),
        },
    },
    controls:       {
        display:    "flex",
        flex:       "1 1 auto",
        alignItems: "center",
    },
    controlsLeft:   {},
    controlsMiddle: {
        justifyContent: "center",
    },
    controlsRight:  {
        justifyContent: "end",
    },
    controlsPrefix: {},
    controlsSuffix: {},
    header:         {
        backgroundColor: switchScheme(
            theme,
            theme.colors.gray[6],
            theme.colors.gray[0]
        ),
        fontWeight:      "bold",
        height:          "3em",
        display:         "flex",
        flex:            "1 1 auto",
        justifyContent:  "center",
        alignItems:      "center",
    },
    cell:           {
        height:    "6em",
        padding:   "0",
        "&:hover": {
            backgroundColor: switchScheme(
                theme,
                theme.colors.gray[6],
                theme.colors.gray[0]
            ),
        }
    },
    monthCell:      {
        display:        "flex",
        flex:           "1 1 auto",
        justifyContent: "center",
        alignItems:     "center",
    },
    yearCell:       {
        display:        "flex",
        flex:           "1 1 auto",
        justifyContent: "center",
        alignItems:     "center",
    },
    row:            {
        "& > div": {
            borderRight: "1px solid",
            borderColor: switchScheme(
                theme,
                theme.colors.gray[6],
                theme.colors.gray[4]
            ),
        },
    },
    currentMonth:   {
        fontWeight:      "bold",
        backgroundColor: switchScheme(
            theme,
            theme.colors.gray[6],
            theme.colors.gray[1]
        ),
    },
    currentYear:    {
        fontWeight:      "bold",
        backgroundColor: switchScheme(
            theme,
            theme.colors.gray[6],
            theme.colors.gray[1]
        ),
    },
    currentWeek:    {},
    currentDay:     {
        backgroundColor: switchScheme(
            theme,
            theme.colors.gray[6],
            theme.colors.gray[2]
        ),
    },
    inRange:        {
        fontWeight: "bold",
    },
    outOfRange:     {
        backgroundColor: switchScheme(
            theme,
            theme.colors.gray[6],
            theme.colors.gray[0]
        ),
    },
}));

export type ICalendarStyles = InferSelectors<typeof useStyles>;

export type ICalendarComponent =
    ((props: ICalendarComponent.IRenderProps) => ReactNode)
    | ReactNode;

export namespace ICalendarComponent {
    export interface IRenderProps {
        classes: ICalendarStyles;
    }
}

export interface ICalendarShellEvents<TSourceSchema extends ISourceSchema<ICalendarEventSchema>> {
    schema: TSourceSchema["EntitySchema"];
    useSource: IUseSourceState<TSourceSchema>;
}

export interface ICalendarShellProps<TSourceSchema extends ISourceSchema<ICalendarEventSchema>> extends Omit<ComponentProps<typeof Container>, "children"> {
    events?: ICalendarShellEvents<TSourceSchema>;
    withControls?: boolean;
    controlsTopLeft?: ICalendarComponent;
    controlsTopMiddle?: ICalendarComponent;
    controlsTopRight?: ICalendarComponent;
    controlsBottomLeft?: ICalendarComponent;
    controlsBottomMiddle?: ICalendarComponent;
    controlsBottomRight?: ICalendarComponent;
    children: ICalendarComponent;
}

const renderComponent = (component: ICalendarComponent | undefined, props: ICalendarComponent.IRenderProps) => isCallable(component) ? component(props) : component;

/**
 * Styled shell for Calendar.
 */
export const CalendarShell = <TSourceSchema extends ISourceSchema<ICalendarEventSchema> = ISourceSchema<ICalendarEventSchema>>(
    {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        events,
        withControls = true,
        controlsTopLeft,
        controlsTopMiddle,
        controlsTopRight,
        controlsBottomLeft,
        controlsBottomMiddle,
        controlsBottomRight,
        children,
        ...props
    }: ICalendarShellProps<TSourceSchema>) => {
    const blockStore         = BlockStore.useOptionalState();
    const {classes}          = useStyles();
    const controlColumnCount = 18;
    const controlWidth       = 7;

    const renderProps: ICalendarComponent.IRenderProps = {
        classes,
    };

    return <Box
        className={classes.calendar}
        {...props}
    >
        <LoadingOverlay visible={withBool(blockStore?.isBlock, false)}/>
        {withControls && <Grid
            columns={controlColumnCount}
            className={classNames(
                classes.calendarGrid,
                classes.controlsGrid,
                classes.controlsPrefix,
            )}
            m={0}
        >
            <Grid.Col
                span={controlWidth}
                className={classNames(
                    classes.controls,
                    classes.controlsLeft,
                )}
            >
                {renderComponent(controlsTopLeft, renderProps)}
            </Grid.Col>
            <Grid.Col
                span={controlColumnCount - (controlWidth * 2)}
                className={classNames(
                    classes.controls,
                    classes.controlsMiddle,
                )}
            >
                {renderComponent(controlsTopMiddle, renderProps)}
            </Grid.Col>
            <Grid.Col
                span={controlWidth}
                className={classNames(
                    classes.controls,
                    classes.controlsRight,
                )}
            >
                {renderComponent(controlsTopRight, renderProps)}
            </Grid.Col>
        </Grid>}
        {renderComponent(children, renderProps)}
        {withControls && (controlsBottomLeft || controlsBottomMiddle || controlsBottomRight) && <Grid
            columns={controlColumnCount}
            className={classNames(
                classes.calendarGrid,
                classes.controlsGrid,
                classes.controlsSuffix,
            )}
            m={0}
        >
            <Grid.Col
                span={controlWidth}
                className={classNames(
                    classes.controls,
                    classes.controlsLeft,
                )}
            >
                {renderComponent(controlsBottomLeft, renderProps)}
            </Grid.Col>
            <Grid.Col
                span={controlColumnCount - (controlWidth * 2)}
                className={classNames(
                    classes.controls,
                    classes.controlsMiddle,
                )}
            >
                {renderComponent(controlsBottomMiddle, renderProps)}
            </Grid.Col>
            <Grid.Col
                span={controlWidth}
                className={classNames(
                    classes.controls,
                    classes.controlsRight,
                )}
            >
                {renderComponent(controlsBottomRight, renderProps)}
            </Grid.Col>
        </Grid>}
    </Box>;
};
