import {z}                      from "@leight/zod";
import {type IRepositorySchema} from "./IRepositorySchema";

export interface RepositoryType<TRepositorySchema extends IRepositorySchema = IRepositorySchema> {
    Entity: z.infer<TRepositorySchema["EntitySchema"]>;
    Create: z.infer<TRepositorySchema["CreateSchema"]>;
    Upsert: z.infer<TRepositorySchema["UpsertSchema"]>;
    Patch: z.infer<TRepositorySchema["PatchSchema"]>;
    PatchBy: z.infer<TRepositorySchema["PatchBySchema"]>;
    Delete: z.infer<TRepositorySchema["DeleteSchema"]>;
    DeleteBy: z.infer<TRepositorySchema["DeleteBySchema"]>;
    Count: z.infer<TRepositorySchema["CountSchema"]>;
    Query: z.infer<TRepositorySchema["QuerySchema"]>;
    Fetch: z.infer<TRepositorySchema["FetchSchema"]>;
    Fetch$: z.infer<TRepositorySchema["Fetch$Schema"]>;
}
