import {type RepositoryMapperType}  from "../repository/RepositoryMapperType";
import {type RepositoryServiceType} from "../repository/RepositoryServiceType";
import {type RepositoryType}        from "../repository/RepositoryType";
import {type ISourceSchema}         from "./ISourceSchema";

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
}
