import {z} from "@leight/zod";
import {
    type ISourceExSchema,
    type ISourceExSchemas
}          from "../api";

export type IWithSourceExSchemaProps<
    TWhereSchema extends z.ZodType,
    TWhereUniqueSchema extends z.ZodType,
    TOrderBySchema extends z.ZodType,
> = ISourceExSchemas<TWhereSchema, TWhereUniqueSchema, TOrderBySchema>;

export type InferSourceExSchema<TSourceExSchemas extends ISourceExSchemas<any, any, any>> = ISourceExSchema<TSourceExSchemas["WhereSchema"], TSourceExSchemas["WhereUniqueSchema"], TSourceExSchemas["OrderBySchema"]>;

export const withSourceExSchema = <
    TWhereSchema extends z.ZodType,
    TWhereUniqueSchema extends z.ZodType,
    TOrderBySchema extends z.ZodType,
>(props: IWithSourceExSchemaProps<TWhereSchema, TWhereUniqueSchema, TOrderBySchema>): ISourceExSchemas<TWhereSchema, TWhereUniqueSchema, TOrderBySchema> => {
    return props;
};
