import {type IStoreContext}    from "@leight/context";
import {
    type IUseMutation,
    type IUseQuery,
    type IUseQueryResult
}                              from "@leight/react-query";
import {z}                     from "@leight/zod";
import {type IQueryStoreProps} from "../query";
import {
    type IWithIdentity,
    type IWithIdentity$
}                              from "../schema";
import {type ISourceSchema}    from "./ISourceSchema";
import {type SourceType}       from "./SourceType";

/**
 * Client side Source tools.
 */
export interface ISource<
    TSourceSchema extends ISourceSchema = ISourceSchema
> {
    name: string;
    schema: TSourceSchema;
    repository: ISource.IUseRepository<TSourceSchema>;
    query: ISource.IQueryContext<TSourceSchema>;
    use: ISource.IUse<TSourceSchema>;
    useInvalidator: ISource.IUseInvalidator;
}

export namespace ISource {
    export interface IUseRepository<
        TSourceSchema extends ISourceSchema,
        TSourceType extends SourceType<TSourceSchema> = SourceType<TSourceSchema>
    > {
        useCreate: IUseMutation<TSourceType["ToCreate"], TSourceType["Dto"]>;
        usePatch: IUseMutation<TSourceType["ToPatchProps"], TSourceType["Dto"]>;
        usePatchBy: IUseMutation<TSourceType["ToPatchByProps"], any>;
        useUpsert: IUseMutation<TSourceType["ToUpsertProps"], TSourceType["Dto"]>;
        useDelete: IUseMutation<TSourceType["Delete"], TSourceType["Dto"]>;
        useDeleteBy: IUseMutation<TSourceType["DeleteBy"], any>;
        useQuery: IUseQuery<TSourceType["Query"], TSourceType["Dto"][]>;
        useCount: IUseQuery<TSourceType["Count"], number>;
        useFetch: IUseQuery<TSourceType["Fetch"], TSourceType["Dto"]>;
        useFetch$: IUseQuery<TSourceType["Fetch$"], TSourceType["Dto"] | null>;
        useGet: IUseQuery<IWithIdentity, TSourceType["Dto"]>;
        useGet$: IUseQuery<IWithIdentity$, TSourceType["Dto"] | null>;
    }

    export type IUse<TSourceSchema extends ISourceSchema> = ({cacheTime}?: {
        cacheTime?: number
    }) => IUseResult<TSourceSchema>;

    export interface IUseResult<TSourceSchema extends ISourceSchema> {
        result: IUseQueryResult<z.infer<TSourceSchema["DtoSchema"]>[]>;
        data: z.infer<TSourceSchema["DtoSchema"]>[];
    }

    export type IUseInvalidator = () => () => void;

    export type IQueryContext<TSourceSchema extends ISourceSchema> = IStoreContext<IQueryStoreProps<TSourceSchema>>;
}
