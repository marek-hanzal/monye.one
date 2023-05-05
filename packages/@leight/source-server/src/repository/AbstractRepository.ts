import {
    type IRepository,
    type IRepositorySchema,
    type ISourceName,
    type IWithIdentity,
    type RepositoryType,
    SourceError
} from "@leight/source";

/**
 * Some base stuff of the repository.
 */
export abstract class AbstractRepository<
    TRepositorySchema extends IRepositorySchema,
    TRepositoryType extends RepositoryType<TRepositorySchema> = RepositoryType<TRepositorySchema>
> implements IRepository<TRepositorySchema> {
    protected constructor(
        $name: ISourceName,
        protected name = $name.toString(),
    ) {
    }

    async create(entity: TRepositoryType["Create"]): Promise<TRepositoryType["Entity"]> {
        return this.runCreate(entity);
    }

    async runCreate(entity: TRepositoryType["Create"]): Promise<TRepositoryType["Entity"]> {
        console.error(`Repository [${this.name}] does not support creating items.`, entity);
        throw new SourceError(`Repository [${this.name}] does not support creating items.`);
    }

    async upsert(props: TRepositoryType["UpsertProps"]): Promise<TRepositoryType["Entity"]> {
        return this.runUpsert(props);
    }

    async runUpsert(props: TRepositoryType["UpsertProps"]): Promise<TRepositoryType["Entity"]> {
        console.error(`Repository [${this.name}] does not support upserting items.`, props);
        throw new SourceError(`Repository [${this.name}] does not support upserting items.`);
    }

    async patch(patch: TRepositoryType["PatchProps"]): Promise<TRepositoryType["Entity"]> {
        return this.runPatch(patch);
    }

    async runPatch(patch: TRepositoryType["PatchProps"]): Promise<TRepositoryType["Entity"]> {
        console.error(`Repository [${this.name}] does not support patching.`, patch);
        throw new SourceError(`Repository [${this.name}] does not support patching.`);
    }

    async patchBy(patch: TRepositoryType["PatchByProps"]): Promise<unknown> {
        return this.runPatchBy(patch);
    }

    async runPatchBy(patch: TRepositoryType["PatchByProps"]): Promise<unknown> {
        console.error(`Repository [${this.name}] does not support patching by query.`, patch);
        throw new SourceError(`Repository [${this.name}] does not support patching by query.`);
    }

    async delete(props: IWithIdentity): Promise<TRepositoryType["Entity"]> {
        return this.runDelete(props);
    }

    async runDelete(props: IWithIdentity): Promise<TRepositoryType["Entity"]> {
        console.error(`Repository [${this.name}] does not support deleting by an ID.`, props);
        throw new SourceError(`Repository [${this.name}] does not support deleting by an ID.`);
    }

    async deleteBy(query: TRepositoryType["DeleteBy"]): Promise<TRepositoryType["Entity"][]> {
        return this.runDeleteBy(query);
    }

    async runDeleteBy(query: TRepositoryType["DeleteBy"]): Promise<TRepositoryType["Entity"][]> {
        console.error(`Repository [${this.name}] does not support deleting by a Query.`, query);
        throw new SourceError(`Repository [${this.name}] does not support deleting by a Query.`);
    }

    async count(count?: TRepositoryType["Count"]): Promise<number> {
        return this.runCount(count || {});
    }

    async runCount(count: TRepositoryType["Count"]): Promise<number> {
        console.error(`Repository [${this.name}] does not support counting items by a query.`, count);
        throw new SourceError(`Repository [${this.name}] does not support counting items by a query.`);
    }

    async query(query?: TRepositoryType["Query"]): Promise<TRepositoryType["Entity"][]> {
        return this.runQuery(query || {});
    }

    async runQuery(query: TRepositoryType["Query"]): Promise<TRepositoryType["Entity"][]> {
        console.error(`Repository [${this.name}] does not support querying items.`, query);
        throw new SourceError(`Repository [${this.name}] does not support querying items.`);
    }

    async fetch(query: TRepositoryType["Fetch"]): Promise<TRepositoryType["Entity"]> {
        return this.runFetch(query);
    }

    async runFetch(query: TRepositoryType["Fetch"]): Promise<TRepositoryType["Entity"]> {
        console.error(`Repository [${this.name}] does not support querying item by query.`, query);
        throw new SourceError(`Repository [${this.name}] does not support querying item by query.`);
    }

    async fetch$(query: TRepositoryType["Fetch$"]): Promise<TRepositoryType["Entity"] | null> {
        try {
            return await this.fetch(query);
        } catch (e) {
            return null;
        }
    }

    async get(id: string): Promise<TRepositoryType["Entity"]> {
        return this.runGet(id);
    }

    async runGet(id: string): Promise<TRepositoryType["Entity"]> {
        console.error(`Repository [${this.name}] does not support querying item by an ID.`, id);
        throw new SourceError(`Repository [${this.name}] does not support querying item by an ID.`);
    }

    async get$(id?: string): Promise<TRepositoryType["Entity"] | null> {
        try {
            return id ? await this.get(id) : null;
        } catch (e) {
            return null;
        }
    }
}
