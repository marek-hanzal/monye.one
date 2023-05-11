import {type FC} from "react";
import {
    type ITransactionLabelTrpcFormProps,
    TransactionLabelTrpcForm
}                from "../sdk";

export interface ITransactionLabelFormProps extends Omit<ITransactionLabelTrpcFormProps, "toRequest" | "toValues" | "inputs" | "dto"> {
}

export const TransactionLabelForm: FC<ITransactionLabelFormProps> = props => {
    return <TransactionLabelTrpcForm
        toRequest={({values}) => values}
        toValues={values => ({labelIds: []})}
        inputs={() => ({
            "labelIds": () => null,
        })}
        dto={{id: "undefined"}}
        {...props}
    >

    </TransactionLabelTrpcForm>;
};
