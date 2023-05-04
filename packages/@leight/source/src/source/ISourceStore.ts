import {type IStoreContext}    from "@leight/context";
import {type IQueryStoreProps} from "../query";
import {type ISourceSchema}    from "./ISourceSchema";
import {type IUseSource}       from "./IUseSource";
import {type IUseSourceProps}  from "./IUseSourceProps";

export type ISourceStore<TSourceSchema extends ISourceSchema> = {
    name: string;
    /**
     * This is a connection to the actual data; it returns React Query stuff and data
     */
    useSource: ({cacheTime}?: Pick<IUseSourceProps<TSourceSchema>, "cacheTime">) => IUseSource<TSourceSchema>;
    /**
     * Wrapper for all source's useXXX queries
     */
    use: TSourceSchema["Type"]["UseQuery"];
    useInvalidator: ISourceSchema.Type.UseQuery.Invalidator;
    /**
     * Access to query state/provider.
     */
    Query: IStoreContext<IQueryStoreProps<TSourceSchema>>;
};
