import {Button}                from "@mantine/core";
import {
    type ComponentProps,
    type FC
}                              from "react";
import {useCalendarStoreState} from "../context";

export interface INextButtonProps extends ComponentProps<typeof Button> {
}

export const NextButton: FC<INextButtonProps> = () => {
    const {calendar: {getForwardProps}} = useCalendarStoreState(({calendar}) => ({calendar}));
    return <Button {...getForwardProps()}>
        Next
    </Button>;
};
