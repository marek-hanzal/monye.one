import {
    ActionIcon,
    Menu
}                  from "@mantine/core";
import {IconMenu2} from "@tabler/icons-react";
import {type FC}   from "react";
import {
    type ITableColumn,
    type ITableInternalProps,
}                  from "./Table";

export interface ITableRowActionProps<TColumn extends ITableColumn> {
    WithRowAction?: FC<ITableInternalProps.IWithRowActionProps<TColumn>>;
    props: ITableInternalProps.IWithRowActionProps<TColumn>;
}

export const TableRowAction = <TColumn extends ITableColumn>({WithRowAction, props}: ITableRowActionProps<TColumn>) => {
    if (!WithRowAction) {
        return null;
    }
    return <Menu
        shadow={"md"}
        width={200}
        withinPortal
        position={"bottom-start"}
    >
        <Menu.Target>
            <ActionIcon
                variant={"light"}
                color={"gray"}
            >
                <IconMenu2/>
            </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
            <WithRowAction {...props}/>
        </Menu.Dropdown>
    </Menu>;
};
