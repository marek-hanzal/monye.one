import {type IWithTranslation} from "@leight/i18n";
import {Translation}           from "@leight/i18n-client";
import {Button}                from "@mantine/core";
import {
    type ComponentProps,
    type FC
}                              from "react";

export interface IPrimaryButtonProps
    extends ComponentProps<typeof Button<"button">> {
    withTranslation: IWithTranslation;
}

export const PrimaryButton: FC<IPrimaryButtonProps> = (
    {
        withTranslation,
        ...props
    }) => {
    return (
        <Button
            variant={"gradient"}
            {...props}
        >
            <Translation {...withTranslation} />
        </Button>
    );
};
