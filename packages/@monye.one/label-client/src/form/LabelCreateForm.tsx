import {TextInput} from "@leight/form-client";
import {IconTags}  from "@tabler/icons-react";
import {type FC}   from "react";
import {
    type ILabelCreateTrpcFormProps,
    LabelCreateInput,
    LabelCreateTrpcForm
}                  from "../sdk";

export interface ILabelCreateFormProps extends Omit<ILabelCreateTrpcFormProps, "toRequest" | "inputs"> {
    type: string;
}

export const LabelCreateForm: FC<ILabelCreateFormProps> = ({type, ...props}) => {
    return <LabelCreateTrpcForm
        toRequest={({values}) => ({
            toCreate: {
                ...values,
                type,
            }
        })}
        inputs={() => ({
            "label": ({mandatory, withLabel, withDescription}) => <TextInput
                {...mandatory}
                {...withLabel}
                {...withDescription}
            />
        })}
        submitProps={{
            leftIcon: <IconTags/>,
        }}
        {...props}
    >
        <LabelCreateInput path={"label"}/>
    </LabelCreateTrpcForm>;
};
