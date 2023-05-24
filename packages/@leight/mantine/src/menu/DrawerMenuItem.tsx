import {type FC} from "react";
import {DrawerStore} from "../context";
import {type IMenuItemProps, MenuItem} from "./MenuItem";

export interface IDrawerMenuItemProps extends IMenuItemProps {
    drawerId: string;
}

export const DrawerMenuItem: FC<IDrawerMenuItemProps> = ({drawerId, ...props}) => {
    const {open} = DrawerStore.use(({open}) => ({open}));
    return <MenuItem
        onClick={() => open(drawerId)}
        {...props}
    />;
};
