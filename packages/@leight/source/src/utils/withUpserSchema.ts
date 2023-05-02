import {z} from "@leight/zod";
import {
    type ISourceSchema,
    type ISourceSchemaType
}          from "../source";

export const withUpsertSchema = <TSourceSchemaType extends ISourceSchemaType>(schema: ISourceSchema.of<TSourceSchemaType>) => z.object({
    toCreate: schema.ToCreateSchema,
    toPatch:  schema.ToPatchSchema,
    filter:   schema.FilterSchema,
});
