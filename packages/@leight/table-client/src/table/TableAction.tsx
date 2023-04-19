import {
    ActionIcon,
    Menu
}                                    from "@mantine/core";
import {IconLayoutBottombarCollapse} from "@tabler/icons-react";
import {type FC}                     from "react";
import {
    type ITableColumn,
    type ITableInternalProps
}                                    from "./Table";

export interface ITableActionProps<TColumn extends ITableColumn> {
    WithTableAction?: FC<ITableInternalProps.IWithTableActionProps<TColumn>>;
    props: Omit<ITableInternalProps.IWithTableActionProps<TColumn>, "portal">;
}

export const TableAction = <TColumn extends ITableColumn>({WithTableAction, props}: ITableActionProps<TColumn>) => {
    if (!WithTableAction) {
        return null;
    }
    return <>
        <Menu
            shadow={"md"}
            width={200}
            withinPortal
            position={"bottom-start"}
        >
            <Menu.Target>
                <ActionIcon>
                    <IconLayoutBottombarCollapse/>
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                <WithTableAction {...props}/>
            </Menu.Dropdown>
        </Menu>
    </>;
};
