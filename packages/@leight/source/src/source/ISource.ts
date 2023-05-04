import {type IWithIdentity}     from "../schema";
import {type ISourceSchemaType} from "./ISourceSchemaType";

/**
 * Implementation of data source (general, not just a database one).
 */
export interface ISource<TSourceSchemaType extends ISourceSchemaType> {
    /**
     * Create a new entity (low-level storage binding, like Prisma or so)
     */
    create(entity: ISource.ICreate<TSourceSchemaType>): Promise<TSourceSchemaType["Entity"]>;

    /**
     * Create or update an existing entity
     */
    upsert(props: ISource.IUpsert<TSourceSchemaType>): Promise<TSourceSchemaType["Entity"]>;

    /**
     * Patch an existing entity; only required changes could be provided (partial update)
     */
    patch(patch: ISource.IPatch<TSourceSchemaType>): Promise<TSourceSchemaType["Entity"]>;

    /**
     * Patch all entities by the given query
     */
    patchBy(patch: ISource.IPatchBy<TSourceSchemaType>): Promise<unknown>;

    /**
     * Delete an entity by an id
     */
    delete(id: ISource.IDelete): Promise<TSourceSchemaType["Entity"]>;

    /**
     * Delete entities by the given query; deleted entities are on the output
     */
    deleteBy(query: ISource.IDeleteBy<TSourceSchemaType>): Promise<TSourceSchemaType["Entity"][]>;

    /**
     * Count items based on an optional query.
     */
    count(query?: ISource.ICount<TSourceSchemaType>): Promise<number>;

    /**
     * Query items.
     */
    query(query?: ISource.IQuery<TSourceSchemaType>): Promise<TSourceSchemaType["Entity"][]>;

    /**
     * Fetch an entity by the given query
     */
    fetch(query: ISource.IFetch<TSourceSchemaType>): Promise<TSourceSchemaType["Entity"]>;

    /**
     * Same as fetch, just optional
     */
    fetch$(query: ISource.IFetch$<TSourceSchemaType>): Promise<TSourceSchemaType["Entity"] | null>;

    /**
     * Get an entity by id
     */
    get(id: string): Promise<TSourceSchemaType["Entity"]>;

    /**
     * Get an optional entity
     */
    get$(id?: string | null): Promise<TSourceSchemaType["Entity"] | null>;
}

export namespace ISource {
    export type ICreate<TSourceSchemaType extends ISourceSchemaType> = TSourceSchemaType["Create"];

    export interface IPatch<TSourceSchemaType extends ISourceSchemaType> {
        patch: TSourceSchemaType["Patch"];
        filter: TSourceSchemaType["Filter"];
    }

    export interface IPatchBy<TSourceSchemaType extends ISourceSchemaType> {
        patch: TSourceSchemaType["Patch"];
        filter: TSourceSchemaType["Filter"];
    }

    export interface IUpsert<TSourceSchemaType extends ISourceSchemaType> {
        create: TSourceSchemaType["Create"];
        patch: TSourceSchemaType["Patch"];
        filter: TSourceSchemaType["Filter"];
    }

    export type IDelete = IWithIdentity;

    export type IDeleteBy<TSourceSchemaType extends ISourceSchemaType> = TSourceSchemaType["Query"];

    export type ICount<TSourceSchemaType extends ISourceSchemaType> = TSourceSchemaType["Query"];

    export type IQuery<TSourceSchemaType extends ISourceSchemaType> = TSourceSchemaType["Query"];

    export type IFetch<TSourceSchemaType extends ISourceSchemaType> = TSourceSchemaType["Query"];

    export type IFetch$<TSourceSchemaType extends ISourceSchemaType> = TSourceSchemaType["Query"];
}
