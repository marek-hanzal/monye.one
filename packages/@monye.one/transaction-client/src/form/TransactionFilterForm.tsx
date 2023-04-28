import {Text}                                  from "@mantine/core";
import {
    BankMultiSelection,
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
            "bankIds": ({mandatory, withLabelPlaceholder, withDescription}) => <BankMultiSourceSelect<ITransactionFilterFormSchemaType>
                {...mandatory}
                {...withLabelPlaceholder}
                {...withDescription}
                Selector={({onClick}) => <BankQueryProvider
                    defaultSort={{
                        account: "asc",
                    }}
                >
                    <BankTable
                        MultiSelectionContext={BankMultiSelection}
                        disableActions
                        withFulltext
                        onClick={onClick}
                    />
                </BankQueryProvider>}
                render={bank => <Text key={bank.id} size={"sm"}>{bank.account}</Text>}
            />,
        })}
        submitProps={{
            leftIcon: <IconFilter/>,
        }}
    >
        <TransactionFilterInput path={"bankIds"}/>
    </TransactionFilterBaseForm>;
};
