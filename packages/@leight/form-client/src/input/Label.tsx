import {type IWithTranslation} from "@leight/i18n";
import {Translation}           from "@leight/i18n-client";
import {Text}                  from "@mantine/core";
import {type FC}               from "react";

export interface ILabelProps {
    withTranslation: IWithTranslation;
    withAsterisk?: boolean;
    label?: string;
}

export const Label: FC<ILabelProps> = ({
                                           withTranslation,
                                           withAsterisk,
                                           label
                                       }) => {
    return label ? <div>
        <Text
            fw={"500"}
            span
        >
            <Translation {...withTranslation} withLabel={label}/>
        </Text>
        {withAsterisk && <Text ml={4} c={"red"} span>*</Text>}
    </div> : null;
};
