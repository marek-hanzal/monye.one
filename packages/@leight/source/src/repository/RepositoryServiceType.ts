import {type IRepositoryServiceSchema} from "./IRepositoryServiceSchema";
import {type RepositoryMapperType}     from "./RepositoryMapperType";

export type RepositoryServiceType<TRepositoryServiceSchema extends IRepositoryServiceSchema = IRepositoryServiceSchema> = RepositoryMapperType<TRepositoryServiceSchema>;
