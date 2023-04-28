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
    const {filter, setShallowFilter} = SourceStore.Query.useState(({filter, setShallowFilter}) => ({filter, setShallowFilter}));
    return <BaseForm
        notification={false}
        onSubmit={({request, onDefaultSubmit}) => {
            setShallowFilter(request);
            onDefaultSubmit();
        }}
        submitProps={{
            leftIcon: <IconFilter/>,
        }}
        defaultValues={filter}
        {...props}
    />;
};
