import {
    Button,
    Menu
}                from "@mantine/core";
import {type FC} from "react";
import {
    type ITableColumn,
    type ITableInternalProps,
}                from "./Table";

export interface ITableRowActionProps<TColumn extends ITableColumn> {
    WithRowAction?: FC<ITableInternalProps.IWithRowActionProps<TColumn>>;
    props: ITableInternalProps.IWithRowActionProps<TColumn>;
}

export const TableRowAction = <TColumn extends ITableColumn>({WithRowAction, props}: ITableRowActionProps<TColumn>) => {
    if (!WithRowAction) {
        return null;
    }
    return <Menu
        shadow="md"
        width={200}
        zIndex={200}
    >
        <Menu.Target>
            <Button>Toggle menu</Button>
        </Menu.Target>

        <Menu.Dropdown>
            <WithRowAction {...props}/>
        </Menu.Dropdown>
    </Menu>;
};
