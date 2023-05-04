import {type IStoreContext}     from "@leight/context";
import {
    type IQueryStoreProps,
    type IUseQueryInvalidator
}                               from "../query";
import {type ISourceSchemaType} from "./ISourceSchemaType";
import {type IUseSource}        from "./IUseSource";
import {type IUseSourceProps}   from "./IUseSourceProps";
import {type IUseSourceQuery}   from "./IUseSourceQuery";

export type ISourceStore<TSourceSchemaType extends ISourceSchemaType> = {
    name: string;
    /**
     * This is a connection to the actual data; it returns React Query stuff and data
     */
    useSource: ({cacheTime}?: Pick<IUseSourceProps<TSourceSchemaType>, "cacheTime">) => IUseSource<TSourceSchemaType>;
    /**
     * Wrapper for all source's useXXX queries
     */
    use: IUseSourceQuery<TSourceSchemaType>;
    useInvalidator: IUseQueryInvalidator;
    /**
     * Access to query state/provider.
     */
    Query: IStoreContext<IQueryStoreProps<TSourceSchemaType>>;
};
