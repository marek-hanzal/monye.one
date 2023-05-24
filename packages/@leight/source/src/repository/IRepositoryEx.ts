import {type IRepository}         from "./IRepository";
import {type IRepositorySchema}   from "./IRepositorySchema";
import {type IRepositorySchemaEx} from "./IRepositorySchemaEx";
import {type RepositoryType}      from "./RepositoryType";

export interface IRepositoryEx<
    TRepositorySchemaEx extends IRepositorySchemaEx.Schema,
    TRepositorySchema extends IRepositorySchema,
    TRepositoryType extends RepositoryType<TRepositorySchema> = RepositoryType<TRepositorySchema>,
    TRepositorySchemaExType extends IRepositorySchemaEx.Type<TRepositorySchemaEx> = IRepositorySchemaEx.Type<TRepositorySchemaEx>
> extends IRepository<TRepositorySchema> {
    toWhere(filter?: TRepositoryType["Filter"]): TRepositorySchemaExType["Where"] | undefined;

    toWhereUnique(filter: TRepositoryType["Filter"]): TRepositorySchemaExType["WhereUnique"];

    toOrderBy(sort?: TRepositoryType["Sort"]): TRepositorySchemaExType["OrderBy"] | undefined;
}
