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
    Group,
    Loader,
    Stack,
    Tooltip
}                                         from "@mantine/core";
import {
    IconCheck,
    IconPlus,
    IconX
}                                         from "@tabler/icons-react";
import {
    type ComponentProps,
    type FC
}                                         from "react";

export interface IBaseLabelControlProps extends ComponentProps<typeof Box<"div">> {
    withTranslation: IWithTranslation;
    SourceStore: ISourceStore<ILabelSourceSchemaType>;
    SelectionContext: IMultiSelectionStoreContext<ILabelSourceSchemaType["Dto"]>;
    withAutoClose?: string[];

    onCommit?(items: ILabelSourceSchemaType["Dto"][]): void;
}

export const BaseLabelControl: FC<IBaseLabelControlProps> = (
    {
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
    return <Box
        {...props}
    >
        <Stack>
            {labels.result.isLoading ? <Loader variant={"dots"} size={"sm"}/> : <Group spacing={"xs"}>
                {labels.data.map(label => <Badge
                    key={label.id}
                    size={"xl"}
                    style={{cursor: "pointer"}}
                    color={isSelected(label) ? "green" : "blue"}
                    leftSection={isSelected(label) ? <ActionIcon size={"sm"}><IconCheck/></ActionIcon> : undefined}
                    onClick={() => toggle(label)}
                >
                    {label.label}
                </Badge>)}
            </Group>}
            <Center>
                <Group spacing={"sm"}>
                    <ActionIcon
                        variant={"subtle"}
                        size={"md"}
                        radius={"xl"}
                        color={"primary"}
                    >
                        <IconPlus/>
                    </ActionIcon>
                    {isSelection() && <>
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
