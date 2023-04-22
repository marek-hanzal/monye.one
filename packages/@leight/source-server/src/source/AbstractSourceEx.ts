import {
    type ISourceEx,
    type ISourceSchemaExType,
    type ISourceSchemaType,
    SourceError
}                       from "@leight/source";
import {AbstractSource} from "./AbstractSource";

export abstract class AbstractSourceEx<TSourceSchemaExType extends ISourceSchemaExType<any, any, any>, TSourceSchemaType extends ISourceSchemaType> extends AbstractSource<TSourceSchemaType> implements ISourceEx<TSourceSchemaExType, TSourceSchemaType> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toWhere(filter?: TSourceSchemaType["Filter"]): TSourceSchemaExType["Where"] | undefined {
        throw new SourceError(`Filter is not supported in [${this.name}] Source.`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toWhereUnique(filter: TSourceSchemaType["Filter"]): TSourceSchemaExType["WhereUnique"] {
        throw new SourceError(`Unique filter is not supported in [${String(this.name)}] Source.`);
    }

    toOrderBy(sort?: TSourceSchemaType["Sort"]): TSourceSchemaExType["OrderBy"] | undefined {
        return sort as TSourceSchemaExType["OrderBy"];
    }
}
