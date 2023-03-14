import {
    type IStoreProviderFactory,
    type IStoreProviderFactoryProps
}                               from "@leight/context-client";
import {type IEntitySchema}     from "@leight/source";
import {type ISourceStoreProps} from "../hook";

export interface ISourceProps<TSchema extends IEntitySchema> extends IStoreProviderFactoryProps<ISourceStoreProps<TSchema>> {
    schema: TSchema;
    SourceProvider: IStoreProviderFactory<ISourceStoreProps<TSchema>>;
}

export const Source = <TSchema extends IEntitySchema>({schema, SourceProvider, ...props}: ISourceProps<TSchema>) => {
    return <SourceProvider
        {...props}
    />;
};
