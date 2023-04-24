import {WithIcon}         from "@leight/mantine";
import {decimalOf}        from "@leight/prisma";
import {toHumanNumber}    from "@leight/utils";
import {
    Group,
    Text
}                         from "@mantine/core";
import {IconCashBanknote} from "@tabler/icons-react";
import {
    type ComponentProps,
    type FC,
    type ReactNode
}                         from "react";

export interface IAmountInlineProps extends ComponentProps<typeof Group> {
    icon?: ReactNode;
    amount?: any;
}

export const AmountInline: FC<IAmountInlineProps> = ({icon = <IconCashBanknote/>, amount, ...props}) => {
    if (amount === undefined || amount === null) {
        return null;
    }
    const color = amount >= 0 ? "green" : "red";
    return <Group spacing={4} {...props}>
        <WithIcon
            color={color}
            icon={icon}
        />
        <Text color={color}>
            {toHumanNumber({number: decimalOf(amount)})}
        </Text>
    </Group>;
};
