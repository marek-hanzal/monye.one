import {
    type IUseMutation,
    type IUseQuery
}                               from "@leight/react-query";
import {type IWithIdentity}     from "../schema";
import {type ISourceSchemaType} from "./ISourceSchemaType";
import {type ISourceService}    from "./ISourceService";

export type IUseSourceQuery<TSourceSchemaType extends ISourceSchemaType> = {
    useCreate: IUseMutation<ISourceService.IHandleCreateProps<TSourceSchemaType>, TSourceSchemaType["Dto"]>;
    usePatch: IUseMutation<ISourceService.IHandlePatchProps<TSourceSchemaType>, TSourceSchemaType["Dto"]>;
    usePatchBy: IUseMutation<ISourceService.IHandlePatchByProps<TSourceSchemaType>, unknown>;
    useUpsert: IUseMutation<ISourceService.IHandleUpsertProps<TSourceSchemaType>, TSourceSchemaType["Dto"]>;
    useDelete: IUseMutation<IWithIdentity, TSourceSchemaType["Dto"]>;
    useDeleteWith: IUseMutation<TSourceSchemaType["Query"], TSourceSchemaType["Dto"][]>;
    useQuery: IUseQuery<TSourceSchemaType["QueryOptional"], TSourceSchemaType["Dto"][]>;
    useCount: IUseQuery<TSourceSchemaType["QueryOptional"], number>;
    useFetch: IUseQuery<TSourceSchemaType["Query"], TSourceSchemaType["Dto"]>;
    useFetchOptional: IUseQuery<TSourceSchemaType["Query"], TSourceSchemaType["Dto"] | undefined>;
    useFind: IUseQuery<IWithIdentity, TSourceSchemaType["Dto"]>;
    useFindOptional: IUseQuery<Partial<IWithIdentity>, TSourceSchemaType["Dto"] | null>;
};
