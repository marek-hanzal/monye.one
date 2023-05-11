import {
    Box,
    Group,
    Loader
}                          from "@mantine/core";
import {trpc}              from "@monye.one/trpc-client";
import {IconSum}           from "@tabler/icons-react";
import {
    type ComponentProps,
    type FC
}                          from "react";
import {
    IconIncome,
    IconOutcome
}                          from "../icon";
import {TransactionSource} from "../sdk";
import {AmountInline}      from "./AmountInline";

export interface ISumByInlineProps extends ComponentProps<typeof Box<"div">> {
    cacheTime?: number;
}

export const SumByInline: FC<ISumByInlineProps> = ({
                                                       cacheTime = 120,
                                                       ...props
                                                   }) => {
    const $cacheTime = cacheTime * 1000;
    const {
        filter,
        withShallowFilterDto,
        withShallowFilter
    } = TransactionSource.query.use((
        {
            filter,
            withShallowFilterDto,
            withShallowFilter
        }) => ({
        filter,
        withShallowFilterDto,
        withShallowFilter
    }));
    const sumBy = trpc.transaction.sumBy.useQuery(filter, {
        staleTime: $cacheTime,
        cacheTime: $cacheTime,
    });
    const isLoading = sumBy.isLoading || sumBy.isFetching;
    const isIncomeOutcome = sumBy.isSuccess && sumBy.data.income > 0 && sumBy.data.outcome < 0;
    return <Box
        pos={"relative"}
        {...props}
    >
        {sumBy.isLoading ? <Loader size={"xs"} variant={"dots"}/> : <Group spacing={"sm"}>
            <AmountInline
                color={isLoading ? "dimmed" : undefined}
                sx={{cursor: isIncomeOutcome ? "not-allowed" : "pointer"}}
                onClick={() => {
                    withShallowFilter({
                        withIncome:  false,
                        withOutcome: false
                    });
                    withShallowFilterDto({
                        withIncome:  false,
                        withOutcome: false
                    });
                }}
                icon={isLoading ? <Loader size={16}/> : <IconSum/>}
                amount={sumBy.data?.sum}
            />
            {isIncomeOutcome && <AmountInline
                color={isLoading ? "dimmed" : undefined}
                sx={{cursor: "pointer"}}
                onClick={() => {
                    withShallowFilter({
                        withIncome:  true,
                        withOutcome: false
                    });
                    withShallowFilterDto({
                        withIncome:  true,
                        withOutcome: false
                    });
                }}
                icon={<IconIncome/>}
                amount={sumBy.data.income}
            />}
            {isIncomeOutcome && <AmountInline
                color={isLoading ? "dimmed" : undefined}
                sx={{cursor: "pointer"}}
                onClick={() => {
                    withShallowFilter({
                        withIncome:  false,
                        withOutcome: true
                    });
                    withShallowFilterDto({
                        withIncome:  false,
                        withOutcome: true
                    });
                }}
                icon={<IconOutcome/>}
                amount={sumBy.data.outcome}
            />}
        </Group>}
    </Box>;
};
