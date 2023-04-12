import {
    createStyles,
    Paper as CoolPaper
} from "@mantine/core";
import {
    type ComponentProps,
    type FC
} from "react";

const useStyles = createStyles((theme) => ({
    paper: {
        "&:hover": {
            boxShadow: theme.shadows.lg,
        },
    },
}));

export interface IPaperProps
    extends Partial<ComponentProps<typeof CoolPaper>> {
}

export const Paper: FC<IPaperProps> = (props) => {
    const {classes} = useStyles();
    return (
        <CoolPaper
            shadow={"sm"}
            className={classes.paper}
            radius={"md"}
            withBorder
            m={"md"}
            p={"md"}
            {...props}
        />
    );
};
