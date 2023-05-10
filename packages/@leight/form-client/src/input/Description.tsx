import {type IWithTranslation} from "@leight/i18n";
import {Translation}           from "@leight/i18n-client";
import {Text}                  from "@mantine/core";
import {type FC}               from "react";

export interface IDescriptionProps {
    withTranslation: IWithTranslation;
    description?: string;
}

export const Description: FC<IDescriptionProps> = (
    {
        withTranslation,
        description
    }) => {
    return description ? <Text
        c={"dimmed"}
        size={"sm"}
    >
        <Translation {...withTranslation} withLabel={description}/>
    </Text> : null;
};
