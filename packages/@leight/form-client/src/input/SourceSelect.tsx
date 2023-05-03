import {
    type IFormSchemaType,
    type IUseForm
}                                    from "@leight/form";
import {Translation}                 from "@leight/i18n-client";
import {type ISelectionStoreContext} from "@leight/selection";
import {
    type ISourceSchemaType,
    type ISourceStore
}                                    from "@leight/source";
import {FulltextProvider}            from "@leight/source-client";
import {generateId}                  from "@leight/utils";
import {
    Button,
    Divider,
    Group,
    Modal
}                                    from "@mantine/core";
import {useDisclosure}               from "@mantine/hooks";
import {
    IconArrowBackUp,
    IconClick,
    IconX
}                                    from "@tabler/icons-react";
import {
    type FC,
    type ReactNode
}                                    from "react";
import {
    type IInputExProps,
    InputEx
}                                    from "./InputEx";
import {Label}                       from "./Label";

export interface ISourceSelectProps<TFormSchemaType extends IFormSchemaType, TSourceSchemaType extends ISourceSchemaType> extends IInputExProps<TFormSchemaType> {
    Selector: ISourceSelectProps.ISelectorComponent<TSourceSchemaType>;
    SelectionContext: ISelectionStoreContext<TSourceSchemaType["Dto"]>;
    SourceStore: ISourceStore<TSourceSchemaType>;

    onCommit?(props: ISourceSelectProps.IOnCommitProps<TFormSchemaType, TSourceSchemaType>): void;

    render(item: TSourceSchemaType["Dto"]): ReactNode;
}

export namespace ISourceSelectProps {
    export type ISelectorComponent<TSourceSchemaType extends ISourceSchemaType> = FC<ISelectorComponentProps<TSourceSchemaType>>;

    export type ISelectorComponentProps<TSourceSchemaType extends ISourceSchemaType> = {
        SelectionContext?: ISelectionStoreContext<TSourceSchemaType["Dto"]>;
        onClick(item: TSourceSchemaType["Dto"]): void;
    }

    export interface IOnCommitProps<TFormSchemaType extends IFormSchemaType, TSourceSchemaType extends ISourceSchemaType> {
        item?: TSourceSchemaType["Dto"];
        form: IUseForm<TFormSchemaType>;
    }
}

export const SourceSelect = <TFormSchemaType extends IFormSchemaType, TSourceSchemaType extends ISourceSchemaType>(
    {
        Selector,
        SelectionContext,
        SourceStore,
        render,
        onCommit,
        ...props
    }: ISourceSelectProps<TFormSchemaType, TSourceSchemaType>) => {
    const [opened, {open, close}]                             = useDisclosure(false);
    const {MantineContext: {useFormContext}, withTranslation} = props.FormContext.useState(({MantineContext, withTranslation}) => ({MantineContext, withTranslation}));
    const form                                                = useFormContext();
    const {onChange, value}                                   = form.getInputProps(props.path);
    const entity                                              = SourceStore.use.useFetchOptional({
        filter: {
            id: value || "",
        }
    });

    return entity.isLoading ? <InputEx
        {...props}
        isLoading
    /> : (entity.isSuccess ? <SelectionContext.Provider
        key={generateId()}
        defaults={{
            item:      entity.data,
            selection: entity.data,
        }}
    >
        {() => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const {item, select, selection, cancel, clear, commit} = SelectionContext.useState();
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
                            SelectionContext={SelectionContext}
                            onClick={select}
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
                                    onChange(selection?.id);
                                    commit();
                                    onCommit?.({item: selection, form});
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
                    {item ? <Group
                        spacing={4}
                        align={"center"}
                    >
                        {render(item)}
                    </Group> : null}
                </InputEx>
            </>;
        }}
    </SelectionContext.Provider> : <>boom</>);
};
