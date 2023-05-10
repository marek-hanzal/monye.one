import {
    type IUseMutation,
    type IUseQuery
}                                     from "@leight/react-query";
import {
    type IWithIdentity,
    type IWithIdentity$
}                                     from "../schema";
import {type IRepositoryMapperSchema} from "./IRepositoryMapperSchema";
import {type RepositoryMapperType}    from "./RepositoryMapperType";

export interface IUseRepository<
    TRepositoryMapperSchema extends IRepositoryMapperSchema,
    TRepositoryMapperType extends RepositoryMapperType<TRepositoryMapperSchema> = RepositoryMapperType<TRepositoryMapperSchema>
> {
    useCreate: IUseMutation<TRepositoryMapperType["ToCreate"], TRepositoryMapperType["Dto"]>;
    usePatch: IUseMutation<TRepositoryMapperType["ToPatchProps"], TRepositoryMapperType["Dto"]>;
    usePatchBy: IUseMutation<TRepositoryMapperType["ToPatchByProps"], unknown>;
    useUpsert: IUseMutation<TRepositoryMapperType["ToUpsertProps"], TRepositoryMapperType["Dto"]>;
    useDelete: IUseMutation<TRepositoryMapperType["Delete"], TRepositoryMapperType["Dto"]>;
    useDeleteBy: IUseMutation<TRepositoryMapperType["DeleteBy"], unknown>;
    useQuery: IUseQuery<TRepositoryMapperType["Query"], TRepositoryMapperType["Dto"][]>;
    useCount: IUseQuery<TRepositoryMapperType["Count"], number>;
    useFetch: IUseQuery<TRepositoryMapperType["Fetch"], TRepositoryMapperType["Dto"]>;
    useFetch$: IUseQuery<TRepositoryMapperType["Fetch$"], TRepositoryMapperType["Dto"] | null>;
    useGet: IUseQuery<IWithIdentity, TRepositoryMapperType["Dto"]>;
    useGet$: IUseQuery<IWithIdentity$, TRepositoryMapperType["Dto"] | null>;
}
