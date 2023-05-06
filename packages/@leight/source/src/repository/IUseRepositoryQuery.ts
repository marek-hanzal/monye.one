import {type IRepositoryMapperSchema} from "./IRepositoryMapperSchema";
import {type IUseRepository}          from "./IUseRepository";

export interface IUseRepositoryQuery<
    TRepositoryMapperSchema extends IRepositoryMapperSchema
> {
    create: { useMutation: IUseRepository<TRepositoryMapperSchema>["useCreate"]; };
    patch: { useMutation: IUseRepository<TRepositoryMapperSchema>["usePatch"]; };
    patchBy: { useMutation: IUseRepository<TRepositoryMapperSchema>["usePatchBy"]; };
    upsert: { useMutation: IUseRepository<TRepositoryMapperSchema>["useUpsert"]; };
    delete: { useMutation: IUseRepository<TRepositoryMapperSchema>["useDelete"]; };
    deleteBy: { useMutation: IUseRepository<TRepositoryMapperSchema>["useDeleteBy"]; };
    query: { useQuery: IUseRepository<TRepositoryMapperSchema>["useQuery"]; };
    count: { useQuery: IUseRepository<TRepositoryMapperSchema>["useCount"]; };
    fetch: { useQuery: IUseRepository<TRepositoryMapperSchema>["useFetch"]; };
    fetch$: { useQuery: IUseRepository<TRepositoryMapperSchema>["useFetch$"]; };
    get: { useQuery: IUseRepository<TRepositoryMapperSchema>["useGet"]; };
    get$: { useQuery: IUseRepository<TRepositoryMapperSchema>["useGet$"]; };
}
