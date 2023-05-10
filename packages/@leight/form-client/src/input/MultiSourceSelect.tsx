import {type IFormSchemaType}             from "@leight/form";
import {Translation}                      from "@leight/i18n-client";
import {type IMultiSelectionStoreContext} from "@leight/selection";
import {
    ISource,
    ISourceSchema,
    SourceType
}                                         from "@leight/source";
import {FulltextProvider}                 from "@leight/source-client";
import {generateId}                       from "@leight/utils";
import {
    Button,
    Divider,
    Group,
    Modal
}                                         from "@mantine/core";
import {useDisclosure}                    from "@mantine/hooks";
import {
    IconArrowBackUp,
    IconClick,
    IconX
}                                         from "@tabler/icons-react";
import {
    type FC,
    type ReactNode
}                                         from "react";
import {
    type IInputExProps,
    InputEx
}                                         from "./InputEx";
import {Label}                            from "./Label";

export interface ISourceMultiSelectProps<
    TFormSchemaType extends IFormSchemaType,
    TSourceSchema extends ISourceSchema,
    TSourceType extends SourceType<TSourceSchema> = SourceType<TSourceSchema>
> extends IInputExProps<TFormSchemaType> {
    Selector: ISourceMultiSelectProps.ISelectorComponent<TSourceSchema>;
    SelectionContext: IMultiSelectionStoreContext<TSourceType["Dto"]>;
    Source: ISource<TSourceSchema>;

    render(items: TSourceType["Dto"][]): ReactNode;
}

export namespace ISourceMultiSelectProps {
    export type ISelectorComponent<TSourceSchema extends ISourceSchema> = FC<ISelectorComponentProps<TSourceSchema>>;

    export type ISelectorComponentProps<
        TSourceSchema extends ISourceSchema,
        TSourceType extends SourceType<TSourceSchema> = SourceType<TSourceSchema>
    > = {
        MultiSelectionContext?: IMultiSelectionStoreContext<TSourceType["Dto"]>;
        onClick(item: TSourceType["Dto"]): void;
    }
}

export const SourceMultiSelect = <
    TFormSchemaType extends IFormSchemaType,
    TSourceSchema extends ISourceSchema,
    TSourceType extends SourceType<TSourceSchema> = SourceType<TSourceSchema>
>(
    {
        Selector,
        SelectionContext,
        Source,
        render,
        ...props
    }: ISourceMultiSelectProps<TFormSchemaType, TSourceSchema>) => {
    const [opened, {
        open,
        close
    }] = useDisclosure(false);
    const {
        MantineContext: {useFormContext},
        withTranslation
    } = props.FormContext.use((
        {
            MantineContext,
            withTranslation
        }) => ({
        MantineContext,
        withTranslation
    }));
    const {
        onChange,
        value
    } = useFormContext().getInputProps(props.path);
    const entity = Source.repository.useQuery({
        filter: {
            ids: value || [],
        },
    });

    return entity.isLoading ? <InputEx
        {...props}
        isLoading
    /> : (entity.isSuccess ? <SelectionContext.Provider
        key={generateId()}
        defaults={{
            items:     entity.data.reduce((prev, current) => {
                prev[current.id] = current;
                return prev;
            }, {} as Record<string, TSourceType["Dto"]>),
            selection: entity.data.reduce((prev, current) => {
                prev[current.id] = current;
                return prev;
            }, {} as Record<string, TSourceType["Dto"]>),
        }}
    >
        {() => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const {
                items,
                selection,
                cancel,
                clear,
                commit,
                toggle
            } = SelectionContext.use();
            return <>
                <Modal
                    opened={opened}
                    onClose={close}
                    zIndex={502}
                    size={"75%"}
                    title={<Label
                        withTranslation={withTranslation}
                        label={`${props.label}.modal.title`}
                        withAsterisk={props.withAsterisk}
                    />}
                >
                    <Divider/>
                    <FulltextProvider>
                        <Selector
                            MultiSelectionContext={SelectionContext}
                            onClick={toggle}
                        />
                        <Divider mt={"sm"} mb={"sm"}/>
                        <Group spacing={"md"} position={"apart"}>
                            <Group spacing={"sm"}>
                                <Button
                                    leftIcon={<IconArrowBackUp/>}
                                    variant={"subtle"}
                                    size={"md"}
                                    onClick={() => {
                                        cancel();
                                        close();
                                    }}
                                >
                                    <Translation {...withTranslation} label={"selection"} withLabel={"cancel.button"}/>
                                </Button>
                                <Button
                                    leftIcon={<IconX/>}
                                    variant={"subtle"}
                                    size={"md"}
                                    onClick={() => {
                                        onChange([]);
                                        clear();
                                        close();
                                    }}
                                >
                                    <Translation {...withTranslation} label={"selection"} withLabel={"clear.button"}/>
                                </Button>
                            </Group>
                            <Button
                                leftIcon={<IconClick/>}
                                size={"lg"}
                                onClick={() => {
                                    onChange(Object.keys(selection));
                                    commit();
                                    close();
                                }}
                            >
                                <Translation {...withTranslation} label={"selection"} withLabel={"submit.button"}/>
                            </Button>
                        </Group>
                    </FulltextProvider>
                </Modal>

                <InputEx
                    onClick={open}
                    onClear={clear}
                    {...props}
                >
                    {Object.values(items).length ? <Group
                        spacing={4}
                        align={"center"}
                    >
                        {render(Object.values(items))}
                    </Group> : null}
                </InputEx>
            </>;
        }}
    </SelectionContext.Provider> : <>boom</>);
};
