import {
    BankMultiSourceSelect,
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
            "bankId": ({mandatory, withLabelPlaceholder, withDescription}) => <BankMultiSourceSelect<ITransactionFilterFormSchemaType>
                {...mandatory}
                {...withLabelPlaceholder}
                {...withDescription}
                Selector={({onClick}) => <BankQueryProvider
                    defaultSort={{
                        account: "asc",
                    }}
                >
                    <BankTable
                        disableActions
                        withFulltext
                        onClick={onClick}
                    />
                </BankQueryProvider>}
                render={bank => bank.account}
            />,
        })}
        submitProps={{
            leftIcon: <IconFilter/>,
        }}
    >
        <TransactionFilterInput path={"bankId"}/>
    </TransactionFilterBaseForm>;
};
