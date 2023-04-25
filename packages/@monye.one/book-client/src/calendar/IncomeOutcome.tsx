import {type IDateRange}                     from "@leight/calendar";
import {toHumanNumber}                       from "@leight/utils";
import {
    Button,
    Group,
    Stack
}                                            from "@mantine/core";
import {type ICalendarEventSourceSchemaType} from "@monye.one/book";
import {IconSum}                             from "@tabler/icons-react";
import {
    type ComponentProps,
    type FC
}                                            from "react";

export interface IIncomeOutcomeProps extends ComponentProps<typeof Group> {
    range: IDateRange;
    events?: ICalendarEventSourceSchemaType["Dto"][];

    onIncomeClick?(props: IIncomeOutcomeProps.IOnIncomeClickProps): void;

    onOutcomeClick?(props: IIncomeOutcomeProps.IOnOutcomeClickProps): void;

    onSumClick?(props: IIncomeOutcomeProps.IOnSumClickProps): void;
}

export namespace IIncomeOutcomeProps {
    export interface IOnIncomeClickProps {
        events?: ICalendarEventSourceSchemaType["Dto"][];
        range: IDateRange;
    }

    export interface IOnOutcomeClickProps {
        events?: ICalendarEventSourceSchemaType["Dto"][];
        range: IDateRange;
    }

    export interface IOnSumClickProps {
        events?: ICalendarEventSourceSchemaType["Dto"][];
        range: IDateRange;
    }
}

export const IncomeOutcome: FC<IIncomeOutcomeProps> = (
    {
        range,
        events,
        onIncomeClick,
        onOutcomeClick,
        onSumClick,
        ...props
    }) => {
    if (!events?.length) {
        return null;
    }
    const income  = events.reduce((prev, current) => prev + current.income, 0);
    const outcome = events.reduce((prev, current) => prev + current.outcome, 0);
    const sum     = income - outcome;
    return <Group
        position={"apart"}
        spacing={0}
        mb={2}
    >
        <Stack
            spacing={0}
            {...props}
        >
            {income > 0 && outcome > 0 && <Button
                size={"sm"}
                variant={"subtle"}
                compact
                disabled={!income}
                color={"green"}
                onClick={() => onIncomeClick?.({
                    events,
                    range,
                })}
            >
                {toHumanNumber({number: income})}
            </Button>}
            {income > 0 && outcome > 0 && <Button
                size={"sm"}
                variant={"subtle"}
                compact
                disabled={!outcome}
                color={"red"}
                onClick={() => onOutcomeClick?.({
                    events,
                    range,
                })}
            >
                {toHumanNumber({number: outcome})}
            </Button>}
        </Stack>
        {sum !== 0 && <Button
            size={"sm"}
            variant={"subtle"}
            compact
            color={sum > 0 ? "green" : "red"}
            leftIcon={<IconSum/>}
            onClick={() => onSumClick?.({
                events,
                range,
            })}
        >
            {toHumanNumber({number: sum})}
        </Button>}
    </Group>;
};
