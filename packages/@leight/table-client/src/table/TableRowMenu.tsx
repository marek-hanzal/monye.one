import {
    ActionIcon,
    Menu
}                  from "@mantine/core";
import {IconMenu2} from "@tabler/icons-react";
import {
    type ComponentProps,
    type FC,
    type ReactNode
}                  from "react";

export interface ITableRowMenuProps extends ComponentProps<typeof Menu> {
    icon?: ReactNode;
}

export const TableRowMenu: FC<ITableRowMenuProps> = ({children, icon = <IconMenu2/>, ...props}) => {
    return <Menu
        shadow={"md"}
        withinPortal
        zIndex={502}
        position={"bottom-start"}
        {...props}
    >
        <Menu.Target>
            <ActionIcon>
                {icon}
            </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
            {children}
        </Menu.Dropdown>
    </Menu>;
};
