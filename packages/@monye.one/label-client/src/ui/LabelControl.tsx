import {
    BaseLabelControl,
    type IBaseLabelControlProps
}                from "@leight/label-client";
import {type FC} from "react";
import {
    LabelQueryProvider,
    LabelSourceStore
}                from "../sdk";

export interface ILabelControlProps extends Omit<IBaseLabelControlProps, "SourceStore"> {
    type: string;
}

export const LabelControl: FC<ILabelControlProps> = ({type, ...props}) => {
    return <LabelQueryProvider
        applyFilter={{
            type,
        }}
    >
        <BaseLabelControl
            SourceStore={LabelSourceStore}
            {...props}
        />
    </LabelQueryProvider>;
};
