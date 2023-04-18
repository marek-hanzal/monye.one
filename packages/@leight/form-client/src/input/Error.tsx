import {Text} from "@mantine/core";
import {
    type ComponentProps,
    type FC
}             from "react";

export interface IErrorProps extends ComponentProps<typeof Text> {
    error?: string;
}

export const Error: FC<IErrorProps> = ({error, ...props}) => {
    return error ? <Text c={"red"} size={"sm"} {...props}>{error}</Text> : null;
};
