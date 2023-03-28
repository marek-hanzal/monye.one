import {Button} from "@mantine/core";
import {
    type ComponentProps,
    type FC
}               from "react";

export interface IPrevButtonProps extends ComponentProps<typeof Button> {
}

export const PrevButton: FC<IPrevButtonProps> = () => {
    return <Button>
        Prev
    </Button>;
};
