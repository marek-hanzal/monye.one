import {type IWithTranslation}            from "@leight/i18n";
import {Translation}                      from "@leight/i18n-client";
import {
    type ILabelSource,
    ILabelSourceType
}                                         from "@leight/label";
import {
    DrawerStore,
    ModalStore
}                                         from "@leight/mantine";
import {type IMultiSelectionStoreContext} from "@leight/selection";
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
    Source: ILabelSource;
    SelectionContext: IMultiSelectionStoreContext<ILabelSourceType["Dto"]>;
    withAutoClose?: string[];

    onCommit?(items: ILabelSourceType["Dto"][]): void;
}

export const BaseLabelControl: FC<IBaseLabelControlProps> = (
    {
        prepend,
        withTranslation,
        Source,
        SelectionContext,
        onCommit,
        withAutoClose = [],
        ...props
    }) => {
    const labels = Source.use();
    const {
        isSelection,
        isSelected,
        selection,
        toggle,
        clear
    } = SelectionContext.use();
    const modal = ModalStore.use$();
    const drawer = DrawerStore.use$();
    const deleteMutation = Source.repository.useDelete();
    const invalidator = Source.useInvalidator();
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
