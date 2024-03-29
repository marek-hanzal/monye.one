import {
    DateInput,
    NumberInput,
    RangeOfInput,
    TextInput
}                                              from "@leight/form-client";
import {wrapJsDate}                            from "@leight/i18n";
import {WithIcon}                              from "@leight/mantine";
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
import {
    FilterQueryProvider,
    FilterSelection,
    FilterSourceSelect,
    FilterTable
}                                              from "@monye.one/filter-client";
import {type ITransactionFilterFormSchemaType} from "@monye.one/transaction";
import {IconArrowRight}                        from "@tabler/icons-react";
import {type FC}                               from "react";
import {
    type ITransactionBaseFilterFormProps,
    TransactionBaseFilterForm,
    TransactionFilterFormStoreContext,
    TransactionFilterInput
}                                              from "../sdk";

export interface ITransactionFilterFormProps extends Omit<ITransactionBaseFilterFormProps, "toRequest" | "inputs"> {
}

export const TransactionFilterForm: FC<ITransactionFilterFormProps> = props => {
    return <TransactionBaseFilterForm
        withAutoClose={["filter"]}
        toRequest={({values: {filter, filterId, from, to, ...values}}) => {
            return {
                ...values,
                from: wrapJsDate(from),
                to:   wrapJsDate(to),
            };
        }}
        getFilterName={({values}) => values.filter}
        inputs={() => ({
            "filter":     ({mandatory, withLabelPlaceholder, withDescription}) => <TextInput
                {...mandatory}
                {...withLabelPlaceholder}
                {...withDescription}
            />,
            "filterId":   ({mandatory, withLabelPlaceholder}) => <FilterSourceSelect<ITransactionFilterFormSchemaType>
                {...mandatory}
                {...withLabelPlaceholder}
                FormContext={TransactionFilterFormStoreContext}
                Selector={({onClick}) => <FilterQueryProvider>
                    <FilterTable
                        sourceCacheTime={0}
                        SelectionContext={FilterSelection}
                        disableActions
                        withFulltext
                        onClick={onClick}
                    />
                </FilterQueryProvider>}
                render={filter => <Badge
                    size={"xl"}
                >
                    {filter.name}
                </Badge>}
                onCommit={({item, form}) => {
                    setTimeout(() => {
                        form.reset();
                        if (item && item.dto) {
                            form.setValues({
                                ...item.dto,
                                filter:   item?.name,
                                filterId: item?.id,
                            });
                        }
                    }, 0);
                }}
            />,
            "bankIds":    ({mandatory, withLabelPlaceholder, withDescription}) => <BankMultiSourceSelect<ITransactionFilterFormSchemaType>
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
                        size={"xl"}
                    >
                        {bank.account}
                    </Badge>)}
                </Group>}
            />,
            "target":     ({mandatory, withLabelPlaceholder, withDescription}) => <TextInput
                {...mandatory}
                {...withLabelPlaceholder}
                {...withDescription}
            />,
            "from":       ({mandatory, withLabelPlaceholder, withDescription}) => <DateInput
                {...mandatory}
                {...withLabelPlaceholder}
                {...withDescription}
                onChange={({form}) => {
                    form.setValues({rangeOf: "none"});
                }}
            />,
            "to":         ({mandatory, withLabelPlaceholder, withDescription}) => <DateInput
                {...mandatory}
                {...withLabelPlaceholder}
                {...withDescription}
                onChange={({form}) => {
                    form.setValues({rangeOf: "none"});
                }}
            />,
            "rangeOf":    ({mandatory, withLabelPlaceholder, withDescription}) => <RangeOfInput
                {...mandatory}
                {...withLabelPlaceholder}
                {...withDescription}
                onRange={({form}) => {
                    form.setValues({
                        from: undefined,
                        to:   undefined,
                    });
                }}
            />,
            "amountFrom": ({mandatory, withLabelPlaceholder, withDescription}) => <NumberInput
                {...mandatory}
                {...withLabelPlaceholder}
                {...withDescription}
                precision={2}
            />,
            "amountTo":   ({mandatory, withLabelPlaceholder, withDescription}) => <NumberInput
                {...mandatory}
                {...withLabelPlaceholder}
                {...withDescription}
                precision={2}
                required={false}
            />,
        })}
        {...props}
    >

        <TransactionFilterInput path={"filter"}/>
        <TransactionFilterInput path={"filterId"}/>
        <Divider mt={"sm"}/>
        <TransactionFilterInput path={"bankIds"}/>
        <TransactionFilterInput path={"target"}/>
        {!props.hidden?.includes("rangeOf") && <Divider mt={"sm"}/>}
        <TransactionFilterInput path={"rangeOf"}/>
        {(!props.hidden?.includes("from") || !props.hidden?.includes("to")) && <Group
            position={"apart"}
            p={"sm"}
        >
            <TransactionFilterInput path={"from"}/>
            <WithIcon
                icon={<IconArrowRight/>}
            />
            <TransactionFilterInput path={"to"}/>
        </Group>}
        <Divider mt={"sm"}/>
        <Group
            position={"apart"}
            p={"sm"}
        >
            <TransactionFilterInput path={"amountFrom"}/>
            <WithIcon
                icon={<IconArrowRight/>}
            />
            <TransactionFilterInput path={"amountTo"}/>
        </Group>
    </TransactionBaseFilterForm>;
};
