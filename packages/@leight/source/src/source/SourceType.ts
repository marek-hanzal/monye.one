import {type IStoreContext} from "@leight/context";
import {type IQueryStoreProps} from "../query";
import {type IRepositoryResult, type IUseRepository, type IUseRepositoryQuery, type RepositoryMapperType, type RepositoryServiceType, type RepositoryType} from "../repository";
import {type ISourceSchema} from "./ISourceSchema";

export interface SourceType<TSourceSchema extends ISourceSchema = ISourceSchema> extends RepositoryServiceType<TSourceSchema["Service"]> {
    Repository: RepositoryType<
        TSourceSchema["Repository"]
    >;
    Mapper: RepositoryMapperType<
        TSourceSchema["Mapper"]
    >;
    Service: RepositoryServiceType<
        TSourceSchema["Service"]
    >;
    UseRepository: IUseRepository<TSourceSchema["Mapper"]>;
    UseRepositoryQuery: IUseRepositoryQuery<TSourceSchema["Mapper"]>;
    UseInvalidator: () => () => void;
    Use: ({cacheTime}?: { cacheTime?: number }) => IRepositoryResult<TSourceSchema>;
    UseRepositoryResult: IRepositoryResult<TSourceSchema>;
    QueryContext: IStoreContext<IQueryStoreProps<TSourceSchema["Mapper"]>>;
}
