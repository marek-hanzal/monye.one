import {type IUseFilterSourceQuery} from "@leight/filter";
import {type IFormSchemaType}       from "@leight/form";
import {
    BaseForm,
    type IBaseFormProps
}                                   from "@leight/form-client";
import {Translation}                from "@leight/i18n-client";
import {
    DrawerStore,
    ModalStore
}                                   from "@leight/mantine";
import {
    type ISourceSchemaType,
    type ISourceStore
}                                   from "@leight/source";
import {
    Button,
    Group
}                                   from "@mantine/core";
import {
    IconFilter,
    IconFilterX,
    IconX
}                                   from "@tabler/icons-react";

export interface IBaseFilterFormProps<TFormSchemaType extends IFormSchemaType, TSourceSchemaType extends ISourceSchemaType> extends IBaseFormProps<TFormSchemaType> {
    SourceStore: ISourceStore<TSourceSchemaType>;
    withFilterQuery?: IBaseFilterFormProps.IWithFilterQuery<TFormSchemaType>;
}

export namespace IBaseFilterFormProps {
    export interface IWithFilterQuery<TFormSchemaType extends IFormSchemaType> {
        type: string;
        UseFilterQuery: IUseFilterSourceQuery;

        getName(props: IWithFilterQuery.IGetNameProps<TFormSchemaType>): string | undefined;
    }

    export namespace IWithFilterQuery {
        export interface IGetNameProps<TFormSchemaType extends IFormSchemaType> extends Omit<IBaseFormProps.IOnSubmitProps<TFormSchemaType>, "onDefaultSubmit"> {
        }
    }
}

export const BaseFilterForm = <TFormSchemaType extends IFormSchemaType, TSourceSchemaType extends ISourceSchemaType>(
    {
        SourceStore,
        withFilterQuery,
        ...props
    }: IBaseFilterFormProps<TFormSchemaType, TSourceSchemaType>
) => {
    const modalContext  = ModalStore.useOptionalState();
    const drawerContext = DrawerStore.useOptionalState();
    const upsertFilter  = withFilterQuery?.UseFilterQuery.useUpsert();

    const withAutoClose = () => {
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
              hasFilter,
              setPage,
          } = SourceStore.Query.useState((
        {
            $filterDto,
            setShallowFilter,
            setFilter,
            setFilterDto,
            hasFilter,
            setPage,
        }) => (
        {
            defaultValues: $filterDto,
            setShallowFilter,
            setFilter,
            setFilterDto,
            hasFilter,
            setPage,
        }));

    return <BaseForm
        notification={false}
        onSubmit={({request, values, form, onDefaultSubmit}) => {
            setShallowFilter(request);
            setFilterDto(values);
            setPage(0);
            if (withFilterQuery) {
                const name = withFilterQuery.getName({request, form, values});
                if (name) {
                    upsertFilter?.mutate({
                        toCreate: {
                            name,
                            type:   withFilterQuery.type,
                            filter: request,
                            dto:    values,
                        },
                        toPatch:  {
                            name,
                            type:   withFilterQuery.type,
                            filter: request,
                            dto:    values,
                        },
                        filter:   {
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
                    setFilter(undefined);
                    setFilterDto(undefined);
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
