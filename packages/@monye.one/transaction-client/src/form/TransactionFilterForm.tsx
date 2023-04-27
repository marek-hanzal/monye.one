import {SourceSelect}                          from "@leight/form-client";
import {type IBankSourceSchemaType}            from "@monye.one/bank";
import {
    BankQueryProvider,
    BankTable
}                                              from "@monye.one/bank-client";
import {type ITransactionFilterFormSchemaType} from "@monye.one/transaction";
import {IconFilter}                            from "@tabler/icons-react";
import {type FC}                               from "react";
import {
    type ITransactionFilterBaseFormProps,
    TransactionFilterBaseForm,
    TransactionFilterInput
}                                              from "../sdk";

export interface ITransactionFilterFormProps extends Omit<ITransactionFilterBaseFormProps, "toRequest" | "inputs"> {
}

export const TransactionFilterForm: FC<ITransactionFilterFormProps> = () => {
    return <TransactionFilterBaseForm
        toRequest={value => value}
        onSubmit={({request, onDefaultSubmit}) => {
            console.log("TransactionFilterBaseForm", request);
            onDefaultSubmit();
        }}
        inputs={() => ({
            "bankId": ({mandatory, withLabelPlaceholder, withDescription}) => <SourceSelect<ITransactionFilterFormSchemaType, IBankSourceSchemaType>
                {...mandatory}
                {...withLabelPlaceholder}
                {...withDescription}
                Selector={({onClick}) => <BankQueryProvider
                    defaultSort={{
                        account: "asc",
                    }}
                >
                    <BankTable
                        withFulltext
                        onClick={onClick}
                    />
                </BankQueryProvider>}
            />,
        })}
        submitProps={{
            leftIcon: <IconFilter/>,
        }}
    >
        <TransactionFilterInput path={"bankId"}/>
    </TransactionFilterBaseForm>;
};
