import {
    type IFormInputs,
    type IFormSchemaType
}                                    from "@leight/form";
import {Translation}                 from "@leight/i18n-client";
import {WithIcon}                    from "@leight/mantine";
import {IMultiSelectionStoreContext} from "@leight/selection";
import {
    type ISourceSchemaType,
    ISourceStore
}                                    from "@leight/source";
import {FulltextProvider}            from "@leight/source-client";
import {
    ActionIcon,
    Box,
    Button,
    Divider,
    Group,
    Loader,
    Modal,
    Stack,
    Text
}                                    from "@mantine/core";
import {useDisclosure}               from "@mantine/hooks";
import {
    IconArrowBackUp,
    IconClick,
    IconX
}                                    from "@tabler/icons-react";
import {
    type ComponentProps,
    type FC,
    type ReactNode
}                                    from "react";
import {Description}                 from "./Description";
import {Error}                       from "./Error";
import {Label}                       from "./Label";

export interface ISourceMultiSelectProps<TFormSchemaType extends IFormSchemaType, TSourceSchemaType extends ISourceSchemaType> extends Omit<ComponentProps<typeof Box<"div">>, "placeholder">, IFormInputs.IInputProps<TFormSchemaType> {
    label?: string;
    description?: string;
    placeholder?: ReactNode;
    withAsterisk?: boolean;
    Selector: ISourceMultiSelectProps.ISelectorComponent<TSourceSchemaType>;
    SelectionContext: IMultiSelectionStoreContext<TSourceSchemaType["Dto"]>;
    SourceStore: ISourceStore<TSourceSchemaType>;

    render(item: TSourceSchemaType["Dto"]): ReactNode;
}

export namespace ISourceMultiSelectProps {
    export type ISelectorComponent<TSourceSchemaType extends ISourceSchemaType> = FC<ISelectorComponentProps<TSourceSchemaType>>;

    export type ISelectorComponentProps<TSourceSchemaType extends ISourceSchemaType> = {
        MultiSelectionContext?: IMultiSelectionStoreContext<TSourceSchemaType["Dto"]>;
        onClick(item: TSourceSchemaType["Dto"]): void;
    }
}

export const SourceMultiSelect = <TFormSchemaType extends IFormSchemaType, TSourceSchemaType extends ISourceSchemaType>(
    {
        FormContext,
        path,
        label,
        description,
        placeholder,
        withAsterisk,
        Selector,
        SelectionContext,
        SourceStore,
        render,
        ...props
    }: ISourceMultiSelectProps<TFormSchemaType, TSourceSchemaType>) => {
    const [opened, {open, close}]                             = useDisclosure(false);
    const {MantineContext: {useFormContext}, withTranslation} = FormContext.useState(({MantineContext, withTranslation}) => ({MantineContext, withTranslation}));
    const {onChange, value, error}                            = useFormContext().getInputProps(path);
    const entity                                              = SourceStore.use.useQuery({
        filter: {
            ids: value || [],
        }
    });
    const selection                                           = entity.data ? entity.data.reduce((prev, current) => {
        prev[current.id] = current;
        return prev;
    }, {} as Record<string, TSourceSchemaType["Dto"]>) : {};

    return entity.isLoading ? <Loader/> : (entity.isSuccess ? <SelectionContext.Provider
        defaults={{
            items: selection,
            selection,
        }}
    >
        {() => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const {items, selection, cancel, clear, commit, toggle} = SelectionContext.useState();

            console.log("State", items, selection);

            return <>
                <Box
                    mt={"md"}
                    {...props}
                >
                    <Modal
                        opened={opened}
                        onClose={close}
                        zIndex={502}
                        size={"75%"}
                        title={<Label
                            withTranslation={withTranslation}
                            label={`${label}.modal.title`}
                            withAsterisk={withAsterisk}
                        />}
                    >
                        <Divider/>
                        <FulltextProvider>
                            <Selector
                                MultiSelectionContext={SelectionContext}
                                onClick={item => {
                                    toggle(item);
                                }}
                            />
                            <Divider mt={"sm"} mb={"sm"}/>
                            <Group spacing={"md"} position={"apart"}>
                                <Button
                                    leftIcon={<IconArrowBackUp/>}
                                    variant={"subtle"}
                                    size={"lg"}
                                    onClick={() => {
                                        cancel();
                                        close();
                                    }}
                                >
                                    <Translation {...withTranslation} label={"selection"} withLabel={"cancel.button"}/>
                                </Button>
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

                    <Stack
                        spacing={"sm"}
                    >
                        <Stack spacing={1}>
                            <Label withTranslation={withTranslation} withAsterisk={withAsterisk} label={label}/>
                            <Description withTranslation={withTranslation} description={description}/>
                        </Stack>
                        <Group
                            onClick={() => open()}
                            sx={{cursor: "pointer"}}
                            align={"center"}
                            spacing={4}
                        >
                            <WithIcon
                                variant={"subtle"}
                                c={"gray"}
                                icon={<IconClick/>}
                            />
                            <Stack
                                spacing={0}
                            >
                                <Text
                                    fw={"500"}
                                >
                                    {Object.values(items).length ? <Group
                                        spacing={4}
                                        align={"center"}
                                    >
                                        <Group spacing={"sm"}>
                                            {Object.values(items).map(render)}
                                        </Group>
                                        <ActionIcon
                                            onClick={e => {
                                                e.stopPropagation();
                                                clear();
                                                onChange(undefined);
                                            }}
                                        >
                                            <IconX/>
                                        </ActionIcon>
                                    </Group> : <Text
                                        c={"dimmed"}
                                    >
                                        <Translation {...withTranslation} withLabel={placeholder}/>
                                    </Text>}
                                </Text>
                                <Error error={error}/>
                            </Stack>
                        </Group>
                    </Stack>
                </Box>
            </>;
        }}
    </SelectionContext.Provider> : <>boom</>);
};
