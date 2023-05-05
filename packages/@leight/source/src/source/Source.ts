import {
    type IRepository,
    type IRepositoryMapper,
    type IRepositoryService
}                           from "../repository";
import {type ISourceSchema} from "./ISourceSchema";
import {type SourceType}    from "./SourceType";

/**
 * This is entry point for all Source related stuff - Repository (for data manipulation), Mapper (to
 * map between outer request to internal request to Repository), Service (to hook into the manipulation
 * process and do other tasks not related to the Repository itself).
 */
export interface Source<
    TSourceSchema extends ISourceSchema,
    TSourceType extends SourceType<TSourceSchema> = SourceType<TSourceSchema>
> {
    /**
     * This can be used as an instance
     */
    Schema: TSourceSchema;
    /**
     * This is just holding all the Source types use to type anything you need related
     * to Source
     */
    Type: TSourceType;

    /**
     * Can be used to type an instance of Repository
     */
    Repository: IRepository<TSourceType["Repository"]>;
    /**
     * Can be used to type an instance of Mapper
     */
    Mapper: IRepositoryMapper<TSourceType["Mapper"]>;
    /**
     * Can be used to type an instance of Service
     */
    Service: IRepositoryService<TSourceType["Service"]>;
}
