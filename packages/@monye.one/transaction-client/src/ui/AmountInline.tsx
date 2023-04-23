import {WithIcon}         from "@leight/mantine";
import {decimalOf}        from "@leight/prisma";
import {toHumanNumber}    from "@leight/utils";
import {
    Group,
    Text
}                         from "@mantine/core";
import {IconCashBanknote} from "@tabler/icons-react";
import {type FC}          from "react";

export interface IAmountInlineProps {
    amount?: any;
}

export const AmountInline: FC<IAmountInlineProps> = ({amount}) => {
    if (amount === undefined || amount === null) {
        return null;
    }
    const color = amount >= 0 ? "green" : "red";
    return <Group spacing={4}>
        <WithIcon
            color={color}
            icon={<IconCashBanknote/>}
        />
        <Text color={color}>
            {toHumanNumber({number: decimalOf(amount)})}
        </Text>
    </Group>;
};
