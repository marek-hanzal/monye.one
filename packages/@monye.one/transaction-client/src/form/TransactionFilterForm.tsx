import {
    DateInput,
    TextInput
}                                              from "@leight/form-client";
import {wrapJsDate}                            from "@leight/i18n";
import {
    Badge,
    Divider,
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
        withAutoClose={["filter"]}
        toRequest={({values: {from, to, ...values}}) => ({
            ...values,
            from: wrapJsDate(from),
            to:   wrapJsDate(to),
        })}
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
            "target":  ({mandatory, withLabelPlaceholder, withDescription}) => <TextInput
                {...mandatory}
                {...withLabelPlaceholder}
                {...withDescription}
            />,
            "from":    ({mandatory, withLabelPlaceholder, withDescription}) => <DateInput
                {...mandatory}
                {...withLabelPlaceholder}
                {...withDescription}
            />,
            "to":      ({mandatory, withLabelPlaceholder, withDescription}) => <DateInput
                {...mandatory}
                {...withLabelPlaceholder}
                {...withDescription}
            />,
        })}
    >
        <TransactionFilterInput path={"bankIds"}/>
        <TransactionFilterInput path={"target"}/>
        <Divider mt={"sm"} mb={"sm"}/>
        <Group
            position={"apart"}
        >
            <TransactionFilterInput path={"from"}/>
            <TransactionFilterInput path={"to"}/>
        </Group>
    </TransactionBaseFilterForm>;
};
