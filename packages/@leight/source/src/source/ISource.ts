import {type ISourceSchema} from "./ISourceSchema";

/**
 * Implementation of data source (general, not just a database one).
 */
export interface ISource<TSourceSchema extends ISourceSchema> {
    /**
     * Create a new entity (low-level storage binding, like Prisma or so)
     */
    create(create: TSourceSchema["Type"]["Source"]["Create"]): Promise<TSourceSchema["Type"]["Source"]["Entity"]>;

    /**
     * Create or update an existing entity
     */
    upsert(upsert: TSourceSchema["Type"]["Source"]["Upsert"]): Promise<TSourceSchema["Type"]["Source"]["Entity"]>;

    /**
     * Patch an existing entity; only required changes could be provided (partial update)
     */
    patch(patch: TSourceSchema["Type"]["Source"]["Patch"]): Promise<TSourceSchema["Type"]["Source"]["Entity"]>;

    /**
     * Patch all entities by the given query
     */
    patchBy(patchBy: TSourceSchema["Type"]["Source"]["PatchBy"]): Promise<unknown>;

    /**
     * Delete an entity by an id
     */
    delete(props: TSourceSchema["Type"]["Source"]["Delete"]): Promise<TSourceSchema["Type"]["Source"]["Entity"]>;

    /**
     * Delete entities by the given query; deleted entities are on the output
     */
    deleteBy(deleteBy: TSourceSchema["Type"]["Source"]["DeleteBy"]): Promise<TSourceSchema["Type"]["Source"]["Entity"][]>;

    /**
     * Count items based on an optional query.
     */
    count(count?: TSourceSchema["Type"]["Source"]["Count"]): Promise<number>;

    /**
     * Query items.
     */
    query(query?: TSourceSchema["Type"]["Source"]["Query"]): Promise<TSourceSchema["Type"]["Source"]["Entity"][]>;

    /**
     * Fetch an entity by the given query
     */
    fetch(fetch: TSourceSchema["Type"]["Source"]["Fetch"]): Promise<TSourceSchema["Type"]["Source"]["Entity"]>;

    /**
     * Same as fetch, just optional
     */
    fetch$(fetch$: TSourceSchema["Type"]["Source"]["Fetch$"]): Promise<TSourceSchema["Type"]["Source"]["Entity"] | null>;

    /**
     * Get an entity by id
     */
    get(id: string): Promise<TSourceSchema["Type"]["Source"]["Entity"]>;

    /**
     * Get an optional entity
     */
    get$(id?: string | null): Promise<TSourceSchema["Type"]["Source"]["Entity"] | null>;
}
