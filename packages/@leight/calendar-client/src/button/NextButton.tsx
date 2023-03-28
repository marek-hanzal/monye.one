import {Button} from "@mantine/core";
import {
    type ComponentProps,
    type FC
}               from "react";

export interface INextButtonProps extends ComponentProps<typeof Button> {
}

export const NextButton: FC<INextButtonProps> = () => {
    return <Button>
        Next
    </Button>;
};
