import {type ILabelSourceSchemaType} from "@leight/label";
import {type ISourceStore}           from "@leight/source";
import {type FC}                     from "react";

export interface IBaseLabelControlProps {
    SourceStore: ISourceStore<ILabelSourceSchemaType>;
}

export const BaseLabelControl: FC<IBaseLabelControlProps> = ({SourceStore}) => {
    const labels = SourceStore.useSource();
    return null;
};
