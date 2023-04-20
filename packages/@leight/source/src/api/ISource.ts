import {type IWithIdentity}     from "../schema";
import {type ISourceSchemaType} from "./ISourceSchemaType";

/**
 * Implementation of data source (general, not just a database one).
 */
export interface ISource<TSourceSchemaType extends ISourceSchemaType> {
    create(entity: TSourceSchemaType["Create"]): Promise<TSourceSchemaType["Entity"]>;

    upsert(props: ISource.IUpsert<TSourceSchemaType>): Promise<TSourceSchemaType["Entity"]>;

    patch(patch: TSourceSchemaType["Patch"]): Promise<TSourceSchemaType["Entity"]>;

    delete(withIdentity: IWithIdentity): Promise<TSourceSchemaType["Entity"]>;

    deleteWith(query: TSourceSchemaType["Query"]): Promise<TSourceSchemaType["Entity"][]>;

    /**
     * Count items based on an optional query.
     */
    count(query?: TSourceSchemaType["Query"]): Promise<number>;

    /**
     * Query items.
     */
    query(query?: TSourceSchemaType["Query"]): Promise<TSourceSchemaType["Entity"][]>;

    fetch(query: TSourceSchemaType["Query"]): Promise<TSourceSchemaType["Entity"]>;

    find(id: string): Promise<TSourceSchemaType["Entity"]>;
}

export namespace ISource {
    export interface IUpsert<TSourceSchemaType extends ISourceSchemaType> {
        create: TSourceSchemaType["Create"];
        patch: Omit<TSourceSchemaType["Patch"], "id">;
        filter: TSourceSchemaType["Filter"];
    }
}
