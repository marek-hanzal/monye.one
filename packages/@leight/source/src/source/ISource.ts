import {type IWithIdentity}     from "../schema";
import {type ISourceSchemaType} from "./ISourceSchemaType";

/**
 * Implementation of data source (general, not just a database one).
 */
export interface ISource<TSourceSchemaType extends ISourceSchemaType> {
    create(entity: ISource.ICreate<TSourceSchemaType>): Promise<TSourceSchemaType["Entity"]>;

    upsert(props: ISource.IUpsert<TSourceSchemaType>): Promise<TSourceSchemaType["Entity"]>;

    patch(patch: ISource.IPatch<TSourceSchemaType>): Promise<TSourceSchemaType["Entity"]>;

    patchBy(patch: ISource.IPatchBy<TSourceSchemaType>): Promise<unknown>;

    delete(withIdentity: ISource.IDelete): Promise<TSourceSchemaType["Entity"]>;

    deleteWith(query: ISource.IDeleteWith<TSourceSchemaType>): Promise<TSourceSchemaType["Entity"][]>;

    /**
     * Count items based on an optional query.
     */
    count(query?: ISource.ICount<TSourceSchemaType>): Promise<number>;

    /**
     * Query items.
     */
    query(query?: ISource.IQuery<TSourceSchemaType>): Promise<TSourceSchemaType["Entity"][]>;

    fetch(query: ISource.IFetch<TSourceSchemaType>): Promise<TSourceSchemaType["Entity"]>;

    fetchOptional(query: TSourceSchemaType["Query"]): Promise<TSourceSchemaType["Entity"] | null>;

    find(id: string): Promise<TSourceSchemaType["Entity"]>;

    findOptional(id?: string | null): Promise<TSourceSchemaType["Entity"] | null>;
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

    export type IDeleteWith<TSourceSchemaType extends ISourceSchemaType> = TSourceSchemaType["Query"];

    export type ICount<TSourceSchemaType extends ISourceSchemaType> = TSourceSchemaType["Query"];

    export type IQuery<TSourceSchemaType extends ISourceSchemaType> = TSourceSchemaType["Query"];

    export type IFetch<TSourceSchemaType extends ISourceSchemaType> = TSourceSchemaType["Query"];
}
