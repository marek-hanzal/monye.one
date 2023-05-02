import {z} from "@leight/zod";
import {
    type ISourceSchema,
    type ISourceSchemaType
}          from "../source";

export const withPatchSchema = <TSourceSchemaType extends ISourceSchemaType>(schema: ISourceSchema.of<TSourceSchemaType>) => z.object({
    toPatch: schema.ToPatchSchema,
    filter:  schema.FilterSchema,
});
