import {
    BaseLabelControl,
    type IBaseLabelControlProps
}                        from "@leight/label-client";
import {type FC}         from "react";
import {LabelCreateForm} from "../form";
import {
    LabelMultiSelection,
    LabelQueryProvider,
    LabelSourceStore
}                        from "../sdk";

export interface ILabelControlProps extends Omit<IBaseLabelControlProps, "SourceStore" | "SelectionContext" | "prepend"> {
    type: string;
}

export const LabelControl: FC<ILabelControlProps> = ({type, ...props}) => {
    return <LabelMultiSelection.Provider>
        <LabelQueryProvider
            applyFilter={{
                type,
            }}
            defaultCursor={{
                page: 0,
                size: 50,
            }}
        >
            <BaseLabelControl
                prepend={<LabelCreateForm
                    type={type}
                    onSettled={({form}) => {
                        form.setValues({label: ""});
                    }}
                />}
                SourceStore={LabelSourceStore}
                SelectionContext={LabelMultiSelection}
                {...props}
            />
        </LabelQueryProvider>
    </LabelMultiSelection.Provider>;
};
