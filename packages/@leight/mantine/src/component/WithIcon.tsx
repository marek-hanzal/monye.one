import {ThemeIcon} from "@mantine/core";
import {
    type ComponentProps,
    type FC,
    type ReactNode
}                  from "react";

export interface IWithIconPros extends Omit<ComponentProps<typeof ThemeIcon>, "children"> {
    icon: ReactNode;
}

export const WithIcon: FC<IWithIconPros> = ({icon, ...props}) => {
    return icon ? <ThemeIcon
        variant={"outline"}
        color={"gray"}
        sx={{border: "none"}}
        {...props}
    >
        {icon}
    </ThemeIcon> : null;
};
