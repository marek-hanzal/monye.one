import {z}                            from "@leight/zod";
import {type IRepositoryMapperSchema} from "./IRepositoryMapperSchema";
import {type RepositoryType}          from "./RepositoryType";

export interface RepositoryMapperType<TRepositoryMapperSchema extends IRepositoryMapperSchema = IRepositoryMapperSchema> extends RepositoryType<TRepositoryMapperSchema> {
    Dto: z.infer<TRepositoryMapperSchema["DtoSchema"]>;
    ToCreate: z.infer<TRepositoryMapperSchema["ToCreateSchema"]>;
    ToPatch: z.infer<TRepositoryMapperSchema["ToPatchSchema"]>;
}
