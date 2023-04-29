import {
    ActionIcon,
    Menu
}                                    from "@mantine/core";
import {IconLayoutBottombarCollapse} from "@tabler/icons-react";
import {
    type ComponentProps,
    type FC,
    type ReactNode
}                                    from "react";

export interface ITableActionMenuProps extends ComponentProps<typeof Menu> {
    icon?: ReactNode;
}

export const TableActionMenu: FC<ITableActionMenuProps> = ({children, icon = <IconLayoutBottombarCollapse/>, ...props}) => {
    return <Menu
        shadow={"md"}
        withinPortal
        position={"bottom-start"}
        zIndex={502}
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
