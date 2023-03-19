import {
    type ISource,
    type ISourceName,
    type ISourceSchema,
    SourceError
} from "@leight/source";

/**
 * Some base stuff of the source.
 */
export abstract class AbstractSource<TSourceSchema extends ISourceSchema> implements ISource<TSourceSchema> {
    protected constructor(
        $name: ISourceName,
        protected name = $name.toString(),
    ) {
    }

    async create(entity: TSourceSchema["Create"]): Promise<TSourceSchema["Entity"]> {
        return this.runCreate(entity);
    }

    async runCreate(entity: TSourceSchema["Create"]): Promise<TSourceSchema["Entity"]> {
        console.error(`Source [${this.name}] does not support creating items.`, entity);
        throw new SourceError(`Source [${this.name}] does not support creating items.`);
    }

    async upsert(props: ISource.IUpsert<TSourceSchema>): Promise<TSourceSchema["Entity"]> {
        return this.runUpsert(props);
    }

    async runUpsert(props: ISource.IUpsert<TSourceSchema>): Promise<TSourceSchema["Entity"]> {
        console.error(`Source [${this.name}] does not support upserting items.`, props);
        throw new SourceError(`Source [${this.name}] does not support upserting items.`);
    }

    async patch(patch: TSourceSchema["Patch"]): Promise<TSourceSchema["Entity"]> {
        return this.runPatch(patch);
    }

    async runPatch(patch: TSourceSchema["Patch"]): Promise<TSourceSchema["Entity"]> {
        console.error(`Source [${this.name}] does not support patching.`, patch);
        throw new SourceError(`Source [${this.name}] does not support patching.`);
    }

    async count(query?: TSourceSchema["Query"]): Promise<number> {
        return this.runCount(query || {});
    }

    async runCount(query: TSourceSchema["Query"]): Promise<number> {
        console.error(`Source [${this.name}] does not support counting items by a query.`, query);
        throw new SourceError(`Source [${this.name}] does not support counting items by a query.`);
    }

    async query(query?: TSourceSchema["Query"]): Promise<TSourceSchema["Entity"][]> {
        return this.runQuery(query || {});
    }

    async runQuery(query: TSourceSchema["Query"]): Promise<TSourceSchema["Entity"][]> {
        console.error(`Source [${this.name}] does not support querying items.`, query);
        throw new SourceError(`Source [${this.name}] does not support querying items.`);
    }

    async fetch(query: TSourceSchema["Query"]): Promise<TSourceSchema["Entity"]> {
        return this.runFetch(query);
    }

    async runFetch(query: TSourceSchema["Query"]): Promise<TSourceSchema["Entity"]> {
        console.error(`Source [${this.name}] does not support querying item by query.`, query);
        throw new SourceError(`Source [${this.name}] does not support querying item by query.`);
    }

    async find(id: string): Promise<TSourceSchema["Entity"]> {
        return this.runFind(id);
    }

    async runFind(id: string): Promise<TSourceSchema["Entity"]> {
        console.error(`Source [${this.name}] does not support querying item by an ID.`, id);
        throw new SourceError(`Source [${this.name}] does not support querying item by an ID.`);
    }
}
