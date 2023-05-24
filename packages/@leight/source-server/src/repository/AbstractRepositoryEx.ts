import {
    type IRepositoryEx,
    type IRepositorySchema,
    type IRepositorySchemaEx,
    type RepositoryType,
    SourceError
}                           from "@leight/source";
import {AbstractRepository} from "./AbstractRepository";

export abstract class AbstractRepositoryEx<
    TRepositorySchemaEx extends IRepositorySchemaEx.Schema,
    TRepositorySchema extends IRepositorySchema,
    TRepositoryType extends RepositoryType<TRepositorySchema> = RepositoryType<TRepositorySchema>,
    TRepositorySchemaExType extends IRepositorySchemaEx.Type<TRepositorySchemaEx> = IRepositorySchemaEx.Type<TRepositorySchemaEx>
> extends AbstractRepository<TRepositorySchema> implements IRepositoryEx<TRepositorySchemaEx, TRepositorySchema> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toOrderBy(sort?: TRepositoryType["Sort"]): TRepositorySchemaExType["OrderBy"] | undefined {
        return sort as TRepositorySchemaExType["OrderBy"];
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toWhere(filter?: TRepositoryType["Filter"]): TRepositorySchemaExType["Where"] | undefined {
        throw new SourceError(`Filter is not supported in [${this.name}] Source.`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toWhereUnique(filter: TRepositoryType["Filter"]): TRepositorySchemaExType["WhereUnique"] {
        throw new SourceError(`Unique filter is not supported in [${String(this.name)}] Source.`);
    }
}
