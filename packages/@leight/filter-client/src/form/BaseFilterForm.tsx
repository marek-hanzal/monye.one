import {type IFormSchemaType} from "@leight/form";
import {
    BaseForm,
    type IBaseFormProps
}                             from "@leight/form-client";
import {Translation}          from "@leight/i18n-client";
import {
    DrawerStore,
    ModalStore
}                             from "@leight/mantine";
import {
    type ISourceSchemaType,
    type ISourceStore
}                             from "@leight/source";
import {
    Button,
    Group
}                             from "@mantine/core";
import {
    IconFilter,
    IconFilterX,
    IconX
}                             from "@tabler/icons-react";

export interface IBaseFilterFormProps<TFormSchemaType extends IFormSchemaType, TSourceSchemaType extends ISourceSchemaType> extends IBaseFormProps<TFormSchemaType> {
    SourceStore: ISourceStore<TSourceSchemaType>;
}

export const BaseFilterForm = <TFormSchemaType extends IFormSchemaType, TSourceSchemaType extends ISourceSchemaType>(
    {
        SourceStore,
        ...props
    }: IBaseFilterFormProps<TFormSchemaType, TSourceSchemaType>
) => {
    const modalContext  = ModalStore.useOptionalState();
    const drawerContext = DrawerStore.useOptionalState();

    const withAutoclose = () => {
        props.withAutoClose?.forEach(close => {
            modalContext?.close(close);
            drawerContext?.close(close);
        });
    };

    const {
              defaultValues,
              setShallowFilter,
              setFilter,
              setFilterDto,
              setPage,
          } = SourceStore.Query.useState((
        {
            filterDto,
            setShallowFilter,
            setFilter,
            setFilterDto,
            setPage,
        }) => (
        {
            defaultValues: filterDto,
            setShallowFilter,
            setFilter,
            setFilterDto,
            setPage,
        }));
    return <BaseForm
        notification={false}
        onSubmit={({request, values, onDefaultSubmit}) => {
            setShallowFilter(request);
            setFilterDto(values);
            setPage(0);
            onDefaultSubmit();
        }}
        submitProps={{
            leftIcon: <IconFilter/>,
        }}
        defaultValues={defaultValues}
        RenderSubmit={({Submit}) => <Group spacing={"xl"}>
            <Button
                variant={"subtle"}
                size={"md"}
                leftIcon={<IconX/>}
                onClick={withAutoclose}
            >
                <Translation namespace={"common"} label={"filter"} withLabel={"close.button"}/>
            </Button>
            <Button
                variant={"subtle"}
                size={"md"}
                leftIcon={<IconFilterX/>}
                onClick={() => {
                    setFilter(undefined);
                    setFilterDto(undefined);
                    withAutoclose();
                }}
            >
                <Translation namespace={"common"} label={"filter"} withLabel={"clear.button"}/>
            </Button>
            <Submit/>
        </Group>}
        {...props}
    />;
};
