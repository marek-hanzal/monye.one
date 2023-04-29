import {
    type IFormInputs,
    type IFormSchemaType
}                               from "@leight/form";
import {Translation}            from "@leight/i18n-client";
import {WithIcon}               from "@leight/mantine";
import {ISelectionStoreContext} from "@leight/selection";
import {
    type ISourceSchemaType,
    ISourceStore
}                               from "@leight/source";
import {FulltextProvider}       from "@leight/source-client";
import {
    ActionIcon,
    Box,
    Divider,
    Group,
    Loader,
    Modal,
    Stack,
    Text
}                               from "@mantine/core";
import {useDisclosure}          from "@mantine/hooks";
import {
    IconClick,
    IconX
}                               from "@tabler/icons-react";
import {
    type ComponentProps,
    type FC,
    type ReactNode
}                               from "react";
import {Description}            from "./Description";
import {Error}                  from "./Error";
import {Label}                  from "./Label";

export interface ISourceSelectProps<TFormSchemaType extends IFormSchemaType, TSourceSchemaType extends ISourceSchemaType> extends Omit<ComponentProps<typeof Box<"div">>, "placeholder">, IFormInputs.IInputProps<TFormSchemaType> {
    label?: string;
    description?: string;
    placeholder?: ReactNode;
    withAsterisk?: boolean;
    Selector: ISourceSelectProps.ISelectorComponent<TSourceSchemaType>;
    SelectionContext: ISelectionStoreContext<TSourceSchemaType["Dto"]>;
    SourceStore: ISourceStore<TSourceSchemaType>;

    render(item: TSourceSchemaType["Dto"]): ReactNode;
}

export namespace ISourceSelectProps {
    export type ISelectorComponent<TSourceSchemaType extends ISourceSchemaType> = FC<ISelectorComponentProps<TSourceSchemaType>>;

    export type ISelectorComponentProps<TSourceSchemaType extends ISourceSchemaType> = {
        onClick(item: TSourceSchemaType["Dto"]): void;
    }
}

export const SourceSelect = <TFormSchemaType extends IFormSchemaType, TSourceSchemaType extends ISourceSchemaType>(
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
    }: ISourceSelectProps<TFormSchemaType, TSourceSchemaType>) => {
    const [opened, {open, close}]                             = useDisclosure(false);
    const {MantineContext: {useFormContext}, withTranslation} = FormContext.useState(({MantineContext, withTranslation}) => ({MantineContext, withTranslation}));
    const {onChange, value, error}                            = useFormContext().getInputProps(path);
    const entity                                              = SourceStore.use.useFindOptional({id: value});
    return value && entity.isLoading ? <Loader/> : (entity.isSuccess ? <SelectionContext.Provider
        defaults={{
            item: entity.data || undefined,
        }}
    >
        {({store}) => {
            const {item, select} = store.getState();
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
                                onClick={item => {
                                    select(item);
                                    onChange(item.id);
                                    close();
                                }}
                            />
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
                                    {item ? <Group
                                        spacing={4}
                                        align={"center"}
                                    >
                                        {render(item)}
                                        <ActionIcon
                                            onClick={e => {
                                                e.stopPropagation();
                                                select(undefined);
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
