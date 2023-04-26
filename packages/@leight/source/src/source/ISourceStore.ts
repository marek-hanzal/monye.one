import {type ISourceSchemaType} from "./ISourceSchemaType";
import {type IUseSource}        from "./IUseSource";
import {type IUseSourceProps}   from "./IUseSourceProps";

export type ISourceStore<TSourceSchemaType extends ISourceSchemaType> = {
    useSource: ({cacheTime}?: Pick<IUseSourceProps<TSourceSchemaType>, "cacheTime">) => IUseSource<TSourceSchemaType>;
};
