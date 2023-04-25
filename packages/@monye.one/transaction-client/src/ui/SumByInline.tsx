import {
    Box,
    Group,
    Loader
}                               from "@mantine/core";
import {trpc}                   from "@monye.one/trpc-client";
import {IconSum}                from "@tabler/icons-react";
import {
    type ComponentProps,
    type FC
}                               from "react";
import {
    IconIncome,
    IconOutcome
}                               from "../icon";
import {TransactionSourceStore} from "../sdk";
import {AmountInline}           from "./AmountInline";

export interface ISumByInlineProps extends ComponentProps<typeof Box<"div">> {
    cacheTime?: number;
}

export const SumByInline: FC<ISumByInlineProps> = ({cacheTime = 60, ...props}) => {
    const $cacheTime                 = cacheTime * 1000;
    const {filter, setShallowFilter} = TransactionSourceStore.Filter.useState(({filter, setShallowFilter}) => ({filter, setShallowFilter}));
    const sumBy                      = trpc.transaction.sumBy.useQuery(filter, {
        staleTime: $cacheTime,
        cacheTime: $cacheTime,
    });
    const isLoading                  = sumBy.isLoading || sumBy.isFetching;
    const isIncomeOutcome            = sumBy.isSuccess && sumBy.data.income > 0 && sumBy.data.outcome < 0;
    return <Box
        pos={"relative"}
        {...props}
    >
        <Group>
            <AmountInline
                color={isLoading ? "dimmed" : undefined}
                sx={{cursor: isIncomeOutcome ? "not-allowed" : "pointer"}}
                onClick={() => setShallowFilter({withIncome: false, withOutcome: false})}
                icon={isLoading ? <Loader size={16}/> : <IconSum/>}
                amount={sumBy.data?.sum}
            />
            {isIncomeOutcome && <AmountInline
                color={isLoading ? "dimmed" : undefined}
                sx={{cursor: "pointer"}}
                onClick={() => setShallowFilter({withIncome: true, withOutcome: false})}
                icon={<IconIncome/>}
                amount={sumBy.data.income}
            />}
            {isIncomeOutcome && <AmountInline
                color={isLoading ? "dimmed" : undefined}
                sx={{cursor: "pointer"}}
                onClick={() => setShallowFilter({withIncome: false, withOutcome: true})}
                icon={<IconOutcome/>}
                amount={sumBy.data.outcome}
            />}
        </Group>
    </Box>;
};
