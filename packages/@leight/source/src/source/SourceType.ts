import {
    type RepositoryMapperType,
    type RepositoryServiceType,
    type RepositoryType
}                           from "../repository";
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
}
