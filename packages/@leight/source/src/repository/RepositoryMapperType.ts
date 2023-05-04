import {z}                            from "@leight/zod";
import {type IRepositoryMapperSchema} from "./IRepositoryMapperSchema";

export interface RepositoryMapperType<TRepositoryMapperSchema extends IRepositoryMapperSchema = IRepositoryMapperSchema> {
    Entity: z.infer<TRepositoryMapperSchema["EntitySchema"]>;
    Dto: z.infer<TRepositoryMapperSchema["DtoSchema"]>;
    ToCreate: z.infer<TRepositoryMapperSchema["ToCreateSchema"]>;
    Create: z.infer<TRepositoryMapperSchema["CreateSchema"]>;
    ToPatch: z.infer<TRepositoryMapperSchema["ToPatchSchema"]>;
    Patch: z.infer<TRepositoryMapperSchema["PatchSchema"]>;
}
