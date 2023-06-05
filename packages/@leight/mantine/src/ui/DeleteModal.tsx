"use client";

import {Translation}             from "@leight/i18n-client";
import {
    type ISource,
    type ISourceSchema,
    type SourceType
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

export interface IDeleteModalProps<
    TSourceSchema extends ISourceSchema,
    TSourceType extends SourceType<TSourceSchema> = SourceType<TSourceSchema>
> extends IModalProps {
    Source: ISource<TSourceSchema>;
    entity: TSourceType["Dto"];
}

export const DeleteModal = <TSourceSchema extends ISourceSchema>(
    {
        withTranslation,
        Source,
        entity,
        ...props
    }: IDeleteModalProps<TSourceSchema>) => {
    const {close} = ModalStore.use(({close}) => ({close}));
    const deleteMutation = Source.repository.useDelete();
    const invalidator = Source.useInvalidator();
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
