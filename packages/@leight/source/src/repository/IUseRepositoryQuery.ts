import {type ISourceSchema}  from "../source";
import {type IUseRepository} from "./IUseRepository";

export interface IUseRepositoryQuery<
    TSourceSchema extends ISourceSchema
> {
    create: {
        useMutation: IUseRepository<TSourceSchema>["useCreate"];
    };
    patch: {
        useMutation: IUseRepository<TSourceSchema>["usePatch"];
    };
    patchBy: {
        useMutation: IUseRepository<TSourceSchema>["usePatchBy"];
    };
    upsert: {
        useMutation: IUseRepository<TSourceSchema>["useUpsert"];
    };
    delete: {
        useMutation: IUseRepository<TSourceSchema>["useDelete"];
    };
    deleteBy: {
        useMutation: IUseRepository<TSourceSchema>["useDeleteBy"];
    };
    query: {
        useQuery: IUseRepository<TSourceSchema>["useQuery"];
    };
    count: {
        useQuery: IUseRepository<TSourceSchema>["useCount"];
    };
    fetch: {
        useQuery: IUseRepository<TSourceSchema>["useFetch"];
    };
    fetch$: {
        useQuery: IUseRepository<TSourceSchema>["useFetch$"];
    };
    get: {
        useQuery: IUseRepository<TSourceSchema>["useGet"];
    };
    get$: {
        useQuery: IUseRepository<TSourceSchema>["useGet$"];
    };
}
