import {
    Box,
    Group,
    Loader
}                               from "@mantine/core";
import {trpc}                   from "@monye.one/trpc-client";
import {
    IconArrowNarrowDown,
    IconArrowNarrowUp,
    IconSum
}                               from "@tabler/icons-react";
import {
    type ComponentProps,
    type FC
}                               from "react";
import {TransactionSourceStore} from "../sdk";
import {AmountInline}           from "./AmountInline";

export interface ISumByInlineProps extends ComponentProps<typeof Box<"div">> {
}

export const SumByInline: FC<ISumByInlineProps> = props => {
    const {filter, setShallowFilter} = TransactionSourceStore.Filter.useState(({filter, setShallowFilter}) => ({filter, setShallowFilter}));
    const sumBy                      = trpc.transaction.sumBy.useQuery(filter);
    return <Box
        {...props}
    >
        {sumBy.isLoading || sumBy.isFetching ?
            <Loader variant={"dots"} size={"sm"}/> : sumBy.isSuccess ?
                <Group>
                    <AmountInline
                        sx={{cursor: "pointer"}}
                        onClick={() => setShallowFilter({withIncome: false, withOutcome: false})}
                        icon={<IconSum/>}
                        amount={sumBy.data.sum}
                    />
                    {sumBy.data.income > 0 && sumBy.data.outcome < 0 && <AmountInline
                        sx={{cursor: "pointer"}}
                        onClick={() => setShallowFilter({withIncome: true, withOutcome: false})}
                        icon={<IconArrowNarrowUp/>}
                        amount={sumBy.data.income}
                    />}
                    {sumBy.data.income > 0 && sumBy.data.outcome < 0 && <AmountInline
                        sx={{cursor: "pointer"}}
                        onClick={() => setShallowFilter({withIncome: false, withOutcome: true})}
                        icon={<IconArrowNarrowDown/>}
                        amount={sumBy.data.outcome}
                    />}
                </Group> : null}
    </Box>;
};
