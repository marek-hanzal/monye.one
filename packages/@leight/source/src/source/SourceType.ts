import {type IQueryStoreProps} from "../query";
import {
    type IUseRepositoryQuery,
    type RepositoryMapperType,
    type RepositoryServiceType,
    type RepositoryType
}                              from "../repository";
import {type ISourceSchema}    from "./ISourceSchema";

export interface SourceType<TSourceSchema extends ISourceSchema = ISourceSchema> {
    Repository: RepositoryType<
        TSourceSchema["Repository"]
    >;
    Mapper: RepositoryMapperType<
        TSourceSchema["Mapper"]
    >;
    Service: RepositoryServiceType<
        TSourceSchema["Service"]
    >;
    QueryStore: IQueryStoreProps<TSourceSchema["Repository"]>;
    UseRepositoryQuery: IUseRepositoryQuery<TSourceSchema["Mapper"]>;
}
