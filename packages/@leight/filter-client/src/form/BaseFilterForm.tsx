import {type IFilterSource}   from "@leight/filter";
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
    ISource,
    ISourceSchema
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

export interface IBaseFilterFormProps<
    TFormSchemaType extends IFormSchemaType,
    TSourceSchema extends ISourceSchema
> extends IBaseFormProps<TFormSchemaType> {
    Source: ISource<TSourceSchema>;
    withFilterQuery?: IBaseFilterFormProps.IWithFilterQuery<TFormSchemaType>;
}

export namespace IBaseFilterFormProps {
    export interface IWithFilterQuery<TFormSchemaType extends IFormSchemaType> {
        type: string;
        Source: IFilterSource;

        getName(props: IWithFilterQuery.IGetNameProps<TFormSchemaType>): string | undefined;
    }

    export namespace IWithFilterQuery {
        export interface IGetNameProps<TFormSchemaType extends IFormSchemaType> extends Omit<IBaseFormProps.IOnSubmitProps<TFormSchemaType>, "onDefaultSubmit"> {
        }
    }
}

export const BaseFilterForm = <
    TFormSchemaType extends IFormSchemaType,
    TSourceSchema extends ISourceSchema
>(
    {
        Source,
        withFilterQuery,
        ...props
    }: IBaseFilterFormProps<TFormSchemaType, TSourceSchema>
) => {
    const modalContext = ModalStore.use$();
    const drawerContext = DrawerStore.use$();
    const upsertFilter = withFilterQuery?.Source.repository.useUpsert();

    const withAutoClose = () => {
        props.withAutoClose?.forEach(close => {
            modalContext?.close(close);
            drawerContext?.close(close);
        });
    };

    const {
        defaultValues,
        withShallowFilter,
        withFilter,
        withFilterDto,
        hasFilter,
        withPage,
    } = Source.query.use((
        {
            filterDto,
            withShallowFilter,
            withFilter,
            withFilterDto,
            hasFilter,
            withPage,
        }) => (
        {
            defaultValues: filterDto,
            withShallowFilter,
            withFilter,
            withFilterDto,
            hasFilter,
            withPage,
        }));

    return <BaseForm
        notification={false}
        onSubmit={({
                       request,
                       values,
                       form,
                       onDefaultSubmit
                   }) => {
            withShallowFilter(request);
            withFilterDto(values);
            withPage(0);
            if (withFilterQuery) {
                const name = withFilterQuery.getName({
                    request,
                    form,
                    values
                });
                if (name) {
                    upsertFilter?.mutate({
                        create: {
                            name,
                            type:   withFilterQuery.type,
                            filter: request,
                            dto:    values,
                        },
                        patch:  {
                            name,
                            type:   withFilterQuery.type,
                            filter: request,
                            dto:    values,
                        },
                        filter: {
                            type_name: {
                                name,
                                type: withFilterQuery.type,
                            },
                        },
                    });
                }
            }
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
                onClick={withAutoClose}
            >
                <Translation namespace={"common"} label={"filter"} withLabel={"close.button"}/>
            </Button>
            {hasFilter() && <Button
                variant={"subtle"}
                size={"md"}
                leftIcon={<IconFilterX/>}
                onClick={() => {
                    withFilter(undefined);
                    withFilterDto(undefined);
                    withAutoClose();
                }}
            >
                <Translation namespace={"common"} label={"filter"} withLabel={"clear.button"}/>
            </Button>}
            <Submit/>
        </Group>}
        {...props}
    />;
};
