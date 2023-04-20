import {
    type IUseMutation,
    type IUseQuery
}                               from "@leight/react-query";
import {type IWithIdentity}     from "../schema";
import {type ISourceSchemaType} from "./ISourceSchemaType";

export type IUseSourceQuery<TSourceSchemaType extends ISourceSchemaType> = {
    useCreate: IUseMutation<TSourceSchemaType["ToCreate"], TSourceSchemaType["Dto"]>;
    usePatch: IUseMutation<TSourceSchemaType["ToPatch"], TSourceSchemaType["Dto"]>;
    useDelete: IUseMutation<IWithIdentity, TSourceSchemaType["Dto"]>;
    useDeleteWith: IUseMutation<TSourceSchemaType["Query"], TSourceSchemaType["Dto"][]>;
    useQuery: IUseQuery<TSourceSchemaType["Query"] | undefined, TSourceSchemaType["Dto"][]>;
    useCount: IUseQuery<TSourceSchemaType["Query"] | undefined, number>;
    useFetch: IUseQuery<TSourceSchemaType["Query"], TSourceSchemaType["Dto"]>;
    useFind: IUseQuery<IWithIdentity, TSourceSchemaType["Dto"]>;
};
