import {z} from "@leight/zod";
import {
    type ISourceSchema,
    type ISourceSchemaType
}          from "../source";

export const withCreateSchema = <TSourceSchemaType extends ISourceSchemaType>(schema: ISourceSchema.of<TSourceSchemaType>) => z.object({
    toCreate: schema.ToCreateSchema,
});
