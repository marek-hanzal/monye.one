import {Translation}             from "@leight/i18n-client";
import {
    type ISourceSchema,
    type IUseSourceQuery
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

export interface IDeleteModalProps<TSourceSchema extends ISourceSchema> extends IModalProps {
    invalidator: () => void;
    UseDeleteMutation: IUseSourceQuery<TSourceSchema>;
    entity: TSourceSchema["Dto"];
}

export const DeleteModal = <TSourceSchema extends ISourceSchema>(
    {
        invalidator,
        withTranslation,
        UseDeleteMutation,
        entity,
        ...props
    }: IDeleteModalProps<TSourceSchema>) => {
    const {close}        = ModalStore.useState(({close}) => ({close}));
    const deleteMutation = UseDeleteMutation.useDelete();
    return <Modal
        withTranslation={{
            namespace: withTranslation.namespace,
            label:     `${withTranslation.label}.delete`,
        }}
        closeOnClickOutside={!deleteMutation.isLoading}
        title={"title"}
        {...props}
    >
        <Divider mb={"sm"}/>
        <Translation {...withTranslation} label={`${withTranslation.label}.delete.content`} values={entity}/>
        <Divider mt={"sm"} mb={"sm"}/>
        <Group position={"apart"}>
            <Button
                size={"md"}
                color={"blue"}
                variant={"outline"}
                disabled={deleteMutation.isLoading}
                onClick={() => close()}
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
                                    namespace: withTranslation.namespace,
                                    label:     `${withTranslation.label}.delete`,
                                    values:    dto,
                                }
                            });
                        },
                        onSettled: () => close(),
                    });
                }}
            >
                <Translation {...withTranslation} label={`${withTranslation.label}.delete.confirm.button`}/>
            </Button>
        </Group>
    </Modal>;
};
