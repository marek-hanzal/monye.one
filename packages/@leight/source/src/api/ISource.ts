import {type IWithIdentity} from "../schema";
import {type ISourceSchema} from "./ISourceSchema";

/**
 * Implementation of data source (general, not just a database one).
 */
export interface ISource<TSourceSchema extends ISourceSchema> {
    create(entity: TSourceSchema["Create"]): Promise<TSourceSchema["Entity"]>;

    upsert(props: ISource.IUpsert<TSourceSchema>): Promise<TSourceSchema["Entity"]>;

    patch(patch: TSourceSchema["Patch"]): Promise<TSourceSchema["Entity"]>;

    delete(withIdentity: IWithIdentity): Promise<TSourceSchema["Entity"]>;

    deleteWith(query: TSourceSchema["Query"]): Promise<TSourceSchema["Entity"][]>;

    /**
     * Count items based on an optional query.
     */
    count(query?: TSourceSchema["Query"]): Promise<number>;

    /**
     * Query items.
     */
    query(query?: TSourceSchema["Query"]): Promise<TSourceSchema["Entity"][]>;

    fetch(query: TSourceSchema["Query"]): Promise<TSourceSchema["Entity"]>;

    find(id: string): Promise<TSourceSchema["Entity"]>;
}

export namespace ISource {
    export interface IUpsert<TSourceSchema extends ISourceSchema> {
        create: TSourceSchema["Create"];
        patch: Omit<TSourceSchema["Patch"], "id">;
        filter: TSourceSchema["Filter"];
    }
}
