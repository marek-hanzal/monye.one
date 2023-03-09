import {type IWithTranslation} from "@leight/i18n";
import {Translation}           from "@leight/i18n-client";
import {Button}                from "@mantine/core";
import {
    type ComponentProps,
    type FC
}                              from "react";

export interface IActionButtonProps
    extends ComponentProps<typeof Button<"button">> {
    withTranslation: IWithTranslation;
}

export const ActionButton: FC<IActionButtonProps> = ({
                                                         withTranslation,
                                                         ...props
                                                     }) => {
    return (
        <Button
            variant={"gradient"}
            gradient={{from: "blue.7", to: "green.7"}}
            {...props}
        >
            <Translation {...withTranslation} />
        </Button>
    );
};
