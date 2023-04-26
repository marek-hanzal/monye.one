import {Translation}             from "@leight/i18n-client";
import {
    type ISourceSchemaType,
    type ISourceStore
}                                from "@leight/source";
import {
    Button,
    Divider,
    Group
}                                from "@mantine/core";
import {IconTrash}               from "@tabler/icons-react";
import {
    type IModalProps,
    Modal
}                                from "../component";
import {ModalStore}              from "../context";
import {withSuccessNotification} from "../utils";

export interface IDeleteModalProps<TSourceSchemaType extends ISourceSchemaType> extends IModalProps {
    invalidator: () => void;
    SourceStore: ISourceStore<TSourceSchemaType>;
    entity: TSourceSchemaType["Dto"];
}

export const DeleteModal = <TSourceSchemaType extends ISourceSchemaType>(
    {
        invalidator,
        withTranslation,
        SourceStore,
        entity,
        ...props
    }: IDeleteModalProps<TSourceSchemaType>) => {
    const {close}        = ModalStore.useState(({close}) => ({close}));
    const deleteMutation = SourceStore.use.useDelete();
    return <Modal
        withTranslation={{
            ...withTranslation,
            label: withTranslation?.label ? `${withTranslation.label}.delete` : "delete",
        }}
        closeOnClickOutside={!deleteMutation.isLoading}
        title={"title"}
        {...props}
    >
        <Divider mb={"sm"}/>
        <Translation {...withTranslation} withLabel={"delete.content"} values={entity}/>
        <Divider mt={"sm"} mb={"sm"}/>
        <Group position={"apart"}>
            <Button
                size={"md"}
                color={"blue"}
                variant={"outline"}
                disabled={deleteMutation.isLoading}
                onClick={() => close(props.modalId)}
            >
                <Translation namespace={"common"} label={"cancel.button"}/>
            </Button>
            <Button
                size={"lg"}
                color={"red"}
                leftIcon={<IconTrash/>}
                loading={deleteMutation.isLoading}
                onClick={() => {
                    deleteMutation.mutate({
                        id: entity.id,
                    }, {
                        onSuccess: (dto) => {
                            invalidator();
                            withSuccessNotification({
                                withTranslation: {
                                    ...withTranslation,
                                    label:  withTranslation?.label ? `${withTranslation.label}.delete` : "delete",
                                    values: dto,
                                }
                            });
                        },
                        onSettled: () => close(props.modalId),
                    });
                }}
            >
                <Translation {...withTranslation} withLabel={"delete.confirm.button"}/>
            </Button>
        </Group>
    </Modal>;
};
