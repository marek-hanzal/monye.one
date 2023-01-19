import {Paper as CoolPaper} from "@mantine/core";
import {
    type ComponentProps,
    type FC
}                           from "react";

export interface IPaperProps extends Partial<ComponentProps<typeof CoolPaper>> {
}

export const Paper: FC<IPaperProps> = props => {
    return <CoolPaper
        shadow={"md"}
        radius={"md"}
        withBorder
        m={"md"}
        p={"md"}
        {...props}
    />;
};
