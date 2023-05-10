import {
    type IUseMutation,
    type IUseQuery
} from "@leight/react-query";
import {
    type IWithIdentity,
    type IWithIdentity$
} from "../schema";
import {
    type ISourceSchema,
    type SourceType
} from "../source";

export interface IUseRepository<
    TSourceSchema extends ISourceSchema,
    TSourceType extends SourceType<TSourceSchema> = SourceType<TSourceSchema>
> {
    useCreate: IUseMutation<TSourceType["ToCreate"], TSourceType["Dto"]>;
    usePatch: IUseMutation<TSourceType["ToPatchProps"], TSourceType["Dto"]>;
    usePatchBy: IUseMutation<TSourceType["ToPatchByProps"], unknown>;
    useUpsert: IUseMutation<TSourceType["ToUpsertProps"], TSourceType["Dto"]>;
    useDelete: IUseMutation<TSourceType["Delete"], TSourceType["Dto"]>;
    useDeleteBy: IUseMutation<TSourceType["DeleteBy"], unknown>;
    useQuery: IUseQuery<TSourceType["Query"], TSourceType["Dto"][]>;
    useCount: IUseQuery<TSourceType["Count"], number>;
    useFetch: IUseQuery<TSourceType["Fetch"], TSourceType["Dto"]>;
    useFetch$: IUseQuery<TSourceType["Fetch$"], TSourceType["Dto"] | null>;
    useGet: IUseQuery<IWithIdentity, TSourceType["Dto"]>;
    useGet$: IUseQuery<IWithIdentity$, TSourceType["Dto"] | null>;
}
