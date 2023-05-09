import {type IUseQueryResult} from "@leight/react-query";
import {z} from "@leight/zod";
import {type ISourceSchema} from "../source";

export interface IRepositoryResult<TSourceSchema extends ISourceSchema> {
    result: IUseQueryResult<z.infer<TSourceSchema["DtoSchema"]>[]>;
    data: z.infer<TSourceSchema["DtoSchema"]>[];
}
