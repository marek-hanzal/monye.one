import {type RepositoryType} from "./RepositoryType";

export interface IRepository<TRepositoryType extends RepositoryType = RepositoryType> {
    /**
     * Create a new entity (low-level storage binding, like Prisma or so)
     */
    create(create: TRepositoryType["Create"]): Promise<TRepositoryType["Entity"]>;

    /**
     * Create or update an existing entity
     */
    upsert(upsert: TRepositoryType["Upsert"]): Promise<TRepositoryType["Entity"]>;

    /**
     * Patch an existing entity; only required changes could be provided (partial update)
     */
    patch(patch: TRepositoryType["Patch"]): Promise<TRepositoryType["Entity"]>;

    /**
     * Patch all entities by the given query
     */
    patchBy(patchBy: TRepositoryType["PatchBy"]): Promise<unknown>;

    /**
     * Delete an entity by an id
     */
    delete(props: TRepositoryType["Delete"]): Promise<TRepositoryType["Entity"]>;

    /**
     * Delete entities by the given query; deleted entities are on the output
     */
    deleteBy(deleteBy: TRepositoryType["DeleteBy"]): Promise<TRepositoryType["Entity"][]>;

    /**
     * Count items based on an optional query.
     */
    count(count?: TRepositoryType["Count"]): Promise<number>;

    /**
     * Query items.
     */
    query(query?: TRepositoryType["Query"]): Promise<TRepositoryType["Entity"][]>;

    /**
     * Fetch an entity by the given query
     */
    fetch(fetch: TRepositoryType["Fetch"]): Promise<TRepositoryType["Entity"]>;

    /**
     * Same as fetch, just optional
     */
    fetch$(fetch$: TRepositoryType["Fetch$"]): Promise<TRepositoryType["Entity"] | null>;

    /**
     * Get an entity by id
     */
    get(id: string): Promise<TRepositoryType["Entity"]>;

    /**
     * Get an optional entity
     */
    get$(id?: string | null): Promise<TRepositoryType["Entity"] | null>;
}
