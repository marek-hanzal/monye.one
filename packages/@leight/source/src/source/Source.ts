import {
    type IRepository,
    type IRepositoryMapper
}                           from "../repository";
import {type ISourceSchema} from "./ISourceSchema";
import {type SourceType}    from "./SourceType";

export interface Source<
    TSourceSchema extends ISourceSchema,
    TSourceType extends SourceType<TSourceSchema> = SourceType<TSourceSchema>
> {
    Schema: TSourceSchema;
    Repository: IRepository<TSourceType["Repository"]>;
    Mapper: IRepositoryMapper<TSourceType["Mapper"]>;
}
