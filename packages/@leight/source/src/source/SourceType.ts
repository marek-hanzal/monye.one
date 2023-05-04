import {
    type RepositoryMapperType,
    type RepositoryType
}                           from "../repository";
import {type ISourceSchema} from "./ISourceSchema";

export interface SourceType<TSourceSchema extends ISourceSchema = ISourceSchema> {
    Repository: RepositoryType<
        TSourceSchema["Repository"]
    >;
    Mapper: RepositoryMapperType<
        TSourceSchema["Mapper"]
    >;
}
