import {type FC}    from "react";
import {ModalStore} from "../context";
import {
    type IMenuItemProps,
    MenuItem
}                   from "./MenuItem";

export interface IModalMenuItemProps extends IMenuItemProps {
    modalId: string;
}

export const ModalMenuItem: FC<IModalMenuItemProps> = ({modalId, ...props}) => {
    const {open} = ModalStore.useState(({open}) => ({open}));
    return <MenuItem
        onClick={() => open(modalId)}
        {...props}
    />;
};
