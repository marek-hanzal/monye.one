import {type FC}     from "react";
import {DrawerStore} from "../context";
import {
    type IMenuItemProps,
    MenuItem
}                    from "./MenuItem";

export interface IDrawerMenuItemProps extends IMenuItemProps {

}

export const DrawerMenuItem: FC<IDrawerMenuItemProps> = props => {
    const {open} = DrawerStore.useState(({open}) => ({open}));
    return <MenuItem
        onClick={() => open()}
        {...props}
    />;
};
