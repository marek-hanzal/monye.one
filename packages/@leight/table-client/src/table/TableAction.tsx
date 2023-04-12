import {
    ActionIcon,
    Popover
}                                    from "@mantine/core";
import {IconLayoutBottombarCollapse} from "@tabler/icons-react";
import {type FC}                     from "react";
import {
    type ITableColumn,
    type ITableInternalProps
}                                    from "./Table";

export interface ITableActionProps<TColumn extends ITableColumn> {
    WithTableAction?: FC<ITableInternalProps.IWithTableActionProps<TColumn>>;
    props: ITableInternalProps.IWithTableActionProps<TColumn>;
}

export const TableAction = <TColumn extends ITableColumn>({WithTableAction, props}: ITableActionProps<TColumn>) => {
    if (!WithTableAction) {
        return null;
    }
    return <Popover
        position={"bottom"}
        withArrow
        shadow={"md"}
    >
        <Popover.Target>
            <ActionIcon>
                <IconLayoutBottombarCollapse/>
            </ActionIcon>
        </Popover.Target>
        <Popover.Dropdown>
            <WithTableAction
                {...props}
            />
        </Popover.Dropdown>
    </Popover>;
};
