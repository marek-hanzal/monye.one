import {type IDateRange}                 from "@leight/calendar";
import {toHumanNumber}                   from "@leight/utils";
import {
    Button,
    Group
}                                        from "@mantine/core";
import {type ICalendarEventSourceSchema} from "@monye.one/book";
import {
    IconCashBanknote,
    IconSum
}                                        from "@tabler/icons-react";
import {
    type ComponentProps,
    type FC
}                                        from "react";

export interface IIncomeOutcomeProps extends ComponentProps<typeof Group> {
    range: IDateRange;
    events?: ICalendarEventSourceSchema["Entity"][];
    withSum?: boolean;

    onIncomeClick?(props: IIncomeOutcomeProps.IOnIncomeClickProps): void;

    onOutcomeClick?(props: IIncomeOutcomeProps.IOnOutcomeClickProps): void;
}

export namespace IIncomeOutcomeProps {
    export interface IOnIncomeClickProps {
        events?: ICalendarEventSourceSchema["Entity"][];
        range: IDateRange;
    }

    export interface IOnOutcomeClickProps {
        events?: ICalendarEventSourceSchema["Entity"][];
        range: IDateRange;
    }
}

export const IncomeOutcome: FC<IIncomeOutcomeProps> = (
    {
        range,
        events,
        withSum = false,
        onIncomeClick,
        onOutcomeClick,
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
        mb={6}
        {...props}
    >
        <Button
            size={"sm"}
            variant={"outline"}
            compact
            disabled={!income}
            leftIcon={<IconCashBanknote color={income > 0 ? "green" : undefined}/>}
            onClick={() => onIncomeClick?.({
                events,
                range,
            })}
        >
            {toHumanNumber({number: income})}
        </Button>
        <Button
            size={"sm"}
            variant={"outline"}
            compact
            disabled={!outcome}
            leftIcon={<IconCashBanknote color={outcome > 0 ? "red" : undefined}/>}
            onClick={() => onOutcomeClick?.({
                events,
                range,
            })}
        >
            {toHumanNumber({number: outcome})}
        </Button>
        {withSum && <Button
            size={"sm"}
            variant={"subtle"}
            compact
            disabled={!outcome && !outcome}
            leftIcon={<IconSum color={sum > 0 ? "green" : "red"}/>}
        >
            {toHumanNumber({number: sum})}
        </Button>}
    </Group>;
};
