import {z}                      from "@leight/utils";
import {type IRepositorySchema} from "./IRepositorySchema";

export interface RepositoryType<TRepositorySchema extends IRepositorySchema = IRepositorySchema> {
    Entity: z.infer<TRepositorySchema["EntitySchema"]>;
    Create: z.infer<TRepositorySchema["CreateSchema"]>;
    Patch: z.infer<TRepositorySchema["PatchSchema"]>;
    UpsertProps: z.infer<TRepositorySchema["UpsertSchemaProps"]>;
    PatchProps: z.infer<TRepositorySchema["PatchSchemaProps"]>;
    PatchByProps: z.infer<TRepositorySchema["PatchBySchemaProps"]>;
    Delete: z.infer<TRepositorySchema["DeleteSchema"]>;
    DeleteBy: z.infer<TRepositorySchema["DeleteBySchema"]>;
    Count: z.infer<TRepositorySchema["CountSchema"]>;
    Query: z.infer<TRepositorySchema["QuerySchema"]>;
    Fetch: z.infer<TRepositorySchema["FetchSchema"]>;
    Fetch$: z.infer<TRepositorySchema["Fetch$Schema"]>;
    Filter: z.infer<TRepositorySchema["FilterSchema"]>;
    Sort: z.infer<TRepositorySchema["SortSchema"]>;
    Params: z.infer<TRepositorySchema["ParamsSchema"]>;
    Cursor: z.infer<TRepositorySchema["CursorSchema"]>;
}
