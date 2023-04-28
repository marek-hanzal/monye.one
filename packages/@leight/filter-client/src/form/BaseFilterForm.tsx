import {type IFormSchemaType} from "@leight/form";
import {
    BaseForm,
    type IBaseFormProps
}                             from "@leight/form-client";
import {
    type ISourceSchemaType,
    type ISourceStore
}                             from "@leight/source";
import {IconFilter}           from "@tabler/icons-react";

export interface IBaseFilterFormProps<TFormSchemaType extends IFormSchemaType, TSourceSchemaType extends ISourceSchemaType> extends IBaseFormProps<TFormSchemaType> {
    SourceStore: ISourceStore<TSourceSchemaType>;
}

export const BaseFilterForm = <TFormSchemaType extends IFormSchemaType, TSourceSchemaType extends ISourceSchemaType>(
    {
        SourceStore,
        ...props
    }: IBaseFilterFormProps<TFormSchemaType, TSourceSchemaType>
) => {
    const {defaultValues, setShallowFilter} = SourceStore.Query.useState(({filterDto, setShallowFilter}) => ({defaultValues: filterDto, setShallowFilter}));
    return <BaseForm
        notification={false}
        onSubmit={({request, values, onDefaultSubmit}) => {
            setShallowFilter(request, values);
            onDefaultSubmit();
        }}
        submitProps={{
            leftIcon: <IconFilter/>,
        }}
        defaultValues={defaultValues}
        {...props}
    />;
};
