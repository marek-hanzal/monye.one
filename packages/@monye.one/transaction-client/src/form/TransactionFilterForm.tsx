import {
    Badge,
    Group
}                                              from "@mantine/core";
import {
    BankMultiSelection,
    BankMultiSourceSelect,
    BankQueryProvider,
    BankTable
}                                              from "@monye.one/bank-client";
import {type ITransactionFilterFormSchemaType} from "@monye.one/transaction";
import {type FC}                               from "react";
import {
    type     ITransactionBaseFilterFormProps,
    TransactionBaseFilterForm,
    TransactionFilterInput
}                                              from "../sdk";

export interface ITransactionFilterFormProps extends Omit<ITransactionBaseFilterFormProps, "toRequest" | "inputs"> {
}

export const TransactionFilterForm: FC<ITransactionFilterFormProps> = () => {
    return <TransactionBaseFilterForm
        toRequest={value => value}
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
                render={items => <Group spacing={2}>
                    {items.map(bank => <Badge
                        key={bank.id}
                        size={"lg"}
                    >
                        {bank.account}
                    </Badge>)}
                </Group>}
            />,
        })}
    >
        <TransactionFilterInput path={"bankIds"}/>
    </TransactionBaseFilterForm>;
};
