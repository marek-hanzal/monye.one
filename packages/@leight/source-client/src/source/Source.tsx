import {
    type IStoreProvider,
    type IStoreProviderProps
}                           from "@leight/context-client";
import {type IEntitySchema} from "@leight/source";
import {ISourceStoreProps}  from "../hook";

export interface ISourceProps<TSchema extends IEntitySchema> extends IStoreProviderProps<ISourceStoreProps<TSchema>> {
    schema: TSchema;
    SourceProvider: IStoreProvider<ISourceStoreProps<TSchema>>;
}

export const Source = <TSchema extends IEntitySchema>({schema, SourceProvider, ...props}: ISourceProps<TSchema>) => {
    return <SourceProvider
        {...props}
    />;
};
