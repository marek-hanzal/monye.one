import {
    type IUseMutation,
    type IUseQuery
}                           from "@leight/react-query";
import {type IWithIdentity} from "../schema";
import {type ISourceSchema} from "./ISourceSchema";

export type IUseSourceQuery<TSourceSchema extends ISourceSchema> = {
    useCreate: IUseMutation<TSourceSchema["ToCreate"], TSourceSchema["Dto"]>;
    usePatch: IUseMutation<TSourceSchema["ToPatch"], TSourceSchema["Dto"]>;
    useDelete: IUseMutation<IWithIdentity, TSourceSchema["Dto"]>;
    useDeleteWith: IUseMutation<TSourceSchema["Query"], TSourceSchema["Dto"][]>;
    useQuery: IUseQuery<TSourceSchema["Query"] | undefined, TSourceSchema["Dto"][]>;
    useCount: IUseQuery<TSourceSchema["Query"] | undefined, number>;
    useFetch: IUseQuery<TSourceSchema["Query"], TSourceSchema["Dto"]>;
    useFind: IUseQuery<IWithIdentity, TSourceSchema["Dto"]>;
};
