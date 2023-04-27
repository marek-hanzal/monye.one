import {
    type ISource,
    type ISourceName,
    type ISourceSchemaType,
    type IWithIdentity,
    SourceError
} from "@leight/source";

/**
 * Some base stuff of the source.
 */
export abstract class AbstractSource<TSourceSchemaType extends ISourceSchemaType> implements ISource<TSourceSchemaType> {
    protected constructor(
        $name: ISourceName,
        protected name = $name.toString(),
    ) {
    }

    async create(entity: TSourceSchemaType["Create"]): Promise<TSourceSchemaType["Entity"]> {
        return this.runCreate(entity);
    }

    async runCreate(entity: TSourceSchemaType["Create"]): Promise<TSourceSchemaType["Entity"]> {
        console.error(`Source [${this.name}] does not support creating items.`, entity);
        throw new SourceError(`Source [${this.name}] does not support creating items.`);
    }

    async upsert(props: ISource.IUpsert<TSourceSchemaType>): Promise<TSourceSchemaType["Entity"]> {
        return this.runUpsert(props);
    }

    async runUpsert(props: ISource.IUpsert<TSourceSchemaType>): Promise<TSourceSchemaType["Entity"]> {
        console.error(`Source [${this.name}] does not support upserting items.`, props);
        throw new SourceError(`Source [${this.name}] does not support upserting items.`);
    }

    async patch(patch: TSourceSchemaType["Patch"]): Promise<TSourceSchemaType["Entity"]> {
        return this.runPatch(patch);
    }

    async runPatch(patch: TSourceSchemaType["Patch"]): Promise<TSourceSchemaType["Entity"]> {
        console.error(`Source [${this.name}] does not support patching.`, patch);
        throw new SourceError(`Source [${this.name}] does not support patching.`);
    }

    async delete(withIdentity: IWithIdentity): Promise<TSourceSchemaType["Entity"]> {
        return this.runDelete(withIdentity);
    }

    async runDelete(withIdentity: IWithIdentity): Promise<TSourceSchemaType["Entity"]> {
        console.error(`Source [${this.name}] does not support deleting by an ID.`, withIdentity);
        throw new SourceError(`Source [${this.name}] does not support deleting by an ID.`);
    }

    async deleteWith(query: TSourceSchemaType["Query"]): Promise<TSourceSchemaType["Entity"][]> {
        return this.runDeleteWith(query);
    }

    async runDeleteWith(query: TSourceSchemaType["Query"]): Promise<TSourceSchemaType["Entity"][]> {
        console.error(`Source [${this.name}] does not support deleting by a Query.`, query);
        throw new SourceError(`Source [${this.name}] does not support deleting by a Query.`);
    }

    async count(query?: TSourceSchemaType["Query"]): Promise<number> {
        return this.runCount(query || {});
    }

    async runCount(query: TSourceSchemaType["Query"]): Promise<number> {
        console.error(`Source [${this.name}] does not support counting items by a query.`, query);
        throw new SourceError(`Source [${this.name}] does not support counting items by a query.`);
    }

    async query(query?: TSourceSchemaType["Query"]): Promise<TSourceSchemaType["Entity"][]> {
        return this.runQuery(query || {});
    }

    async runQuery(query: TSourceSchemaType["Query"]): Promise<TSourceSchemaType["Entity"][]> {
        console.error(`Source [${this.name}] does not support querying items.`, query);
        throw new SourceError(`Source [${this.name}] does not support querying items.`);
    }

    async fetch(query: TSourceSchemaType["Query"]): Promise<TSourceSchemaType["Entity"]> {
        return this.runFetch(query);
    }

    async runFetch(query: TSourceSchemaType["Query"]): Promise<TSourceSchemaType["Entity"]> {
        console.error(`Source [${this.name}] does not support querying item by query.`, query);
        throw new SourceError(`Source [${this.name}] does not support querying item by query.`);
    }

    async find(id: string): Promise<TSourceSchemaType["Entity"]> {
        return this.runFind(id);
    }

    async runFind(id: string): Promise<TSourceSchemaType["Entity"]> {
        console.error(`Source [${this.name}] does not support querying item by an ID.`, id);
        throw new SourceError(`Source [${this.name}] does not support querying item by an ID.`);
    }

    async findOptional(id?: string): Promise<TSourceSchemaType["Entity"] | undefined> {
        try {
            return id ? this.find(id) : undefined;
        } catch (e) {
            return undefined;
        }
    }
}
