import {type IWithTranslation}            from "@leight/i18n";
import {Translation}                      from "@leight/i18n-client";
import {type ILabelSourceSchemaType}      from "@leight/label";
import {
    DrawerStore,
    ModalStore
}                                         from "@leight/mantine";
import {type IMultiSelectionStoreContext} from "@leight/selection";
import {type ISourceStore}                from "@leight/source";
import {
    ActionIcon,
    Badge,
    Box,
    Center,
    Divider,
    Group,
    Loader,
    Stack,
    Tooltip
}                                         from "@mantine/core";
import {useLabelQueryInvalidator}         from "@monye.one/label-client";
import {
    IconCheck,
    IconX
}                                         from "@tabler/icons-react";
import {
    type ComponentProps,
    type FC,
    type ReactNode
}                                         from "react";

export interface IBaseLabelControlProps extends ComponentProps<typeof Box<"div">> {
    prepend: ReactNode;
    withTranslation: IWithTranslation;
    SourceStore: ISourceStore<ILabelSourceSchemaType>;
    SelectionContext: IMultiSelectionStoreContext<ILabelSourceSchemaType["Dto"]>;
    withAutoClose?: string[];

    onCommit?(items: ILabelSourceSchemaType["Dto"][]): void;
}

export const BaseLabelControl: FC<IBaseLabelControlProps> = (
    {
        prepend,
        withTranslation,
        SourceStore,
        SelectionContext,
        onCommit,
        withAutoClose = [],
        ...props
    }) => {
    const labels                                              = SourceStore.useSource();
    const {isSelection, isSelected, selection, toggle, clear} = SelectionContext.useState();
    const modal                                               = ModalStore.useOptionalState();
    const drawer                                              = DrawerStore.useOptionalState();
    const deleteMutation                                      = SourceStore.use.useDelete();
    const invalidator                                         = useLabelQueryInvalidator();
    return <Box
        {...props}
    >
        <Stack>
            {prepend}
            {labels.data.length > 0 && <Divider mt={"sm"} mb={"sm"}/>}
            <Center>
                {labels.result.isLoading || deleteMutation.isLoading ? <Loader variant={"dots"} size={"sm"}/> : <Group spacing={"xs"}>
                    {labels.data.map(label => <Badge
                        key={label.id}
                        size={"xl"}
                        style={{cursor: "pointer"}}
                        color={isSelected(label) ? "green" : "blue"}
                        leftSection={isSelected(label) ?
                            <ActionIcon size={"sm"}><IconCheck/></ActionIcon> :
                            <ActionIcon
                                size={"sm"}
                                onClick={(e) => {
                                    e.preventDefault();
                                    deleteMutation.mutate({
                                        id: label.id,
                                    }, {
                                        onSuccess: () => {
                                            clear();
                                            invalidator();
                                        }
                                    });
                                }}
                            >
                                <IconX/>
                            </ActionIcon>}
                        onClick={() => toggle(label)}
                    >
                        {label.label}
                    </Badge>)}
                </Group>}
            </Center>
            <Center>
                <Group spacing={"sm"}>
                    {isSelection() && labels.data?.length > 0 && <>
                        <ActionIcon
                            variant={"subtle"}
                            size={"md"}
                            radius={"xl"}
                            color={"red"}
                            onClick={() => {
                                clear();
                                withAutoClose.forEach(item => {
                                    modal?.close(item);
                                    drawer?.close(item);
                                });
                            }}
                        >
                            <IconX/>
                        </ActionIcon>
                        <Tooltip
                            label={<Translation {...withTranslation} withLabel={"commit"}/>}
                        >
                            <ActionIcon
                                variant={"subtle"}
                                size={"md"}
                                radius={"xl"}
                                color={"green"}
                                onClick={() => {
                                    onCommit?.(Object.values(selection));
                                    withAutoClose.forEach(item => {
                                        modal?.close(item);
                                        drawer?.close(item);
                                    });
                                    clear();
                                }}
                            >
                                <IconCheck/>
                            </ActionIcon>
                        </Tooltip>
                    </>}
                </Group>
            </Center>
        </Stack>
    </Box>;
};
