import {type ISource}       from "../source/ISource";
import {type ISourceSchema} from "../source/ISourceSchema";

export interface IUseRepositoryQuery<
    TSourceSchema extends ISourceSchema
> {
    create: {
        useMutation: ISource.IUseRepository<TSourceSchema>["useCreate"];
    };
    patch: {
        useMutation: ISource.IUseRepository<TSourceSchema>["usePatch"];
    };
    patchBy: {
        useMutation: ISource.IUseRepository<TSourceSchema>["usePatchBy"];
    };
    upsert: {
        useMutation: ISource.IUseRepository<TSourceSchema>["useUpsert"];
    };
    delete: {
        useMutation: ISource.IUseRepository<TSourceSchema>["useDelete"];
    };
    deleteBy: {
        useMutation: ISource.IUseRepository<TSourceSchema>["useDeleteBy"];
    };
    query: {
        useQuery: ISource.IUseRepository<TSourceSchema>["useQuery"];
    };
    count: {
        useQuery: ISource.IUseRepository<TSourceSchema>["useCount"];
    };
    fetch: {
        useQuery: ISource.IUseRepository<TSourceSchema>["useFetch"];
    };
    fetch$: {
        useQuery: ISource.IUseRepository<TSourceSchema>["useFetch$"];
    };
    get: {
        useQuery: ISource.IUseRepository<TSourceSchema>["useGet"];
    };
    get$: {
        useQuery: ISource.IUseRepository<TSourceSchema>["useGet$"];
    };
}
