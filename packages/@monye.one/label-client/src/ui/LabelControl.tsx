import {
    BaseLabelControl,
    type IBaseLabelControlProps
}                from "@leight/label-client";
import {type FC} from "react";
import {
    LabelMultiSelection,
    LabelQueryProvider,
    LabelSourceStore
}                from "../sdk";

export interface ILabelControlProps extends Omit<IBaseLabelControlProps, "SourceStore" | "SelectionContext"> {
    type: string;
}

export const LabelControl: FC<ILabelControlProps> = ({type, ...props}) => {
    return <LabelMultiSelection.Provider>
        <LabelQueryProvider
            applyFilter={{
                type,
            }}
        >
            <BaseLabelControl
                SourceStore={LabelSourceStore}
                SelectionContext={LabelMultiSelection}
                {...props}
            />
        </LabelQueryProvider>
    </LabelMultiSelection.Provider>;
};
