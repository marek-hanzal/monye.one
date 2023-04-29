import {z}                    from "@leight/zod";
import {type ISourceSchemaEx} from "../source";

export type IWithSourceSchemaExProps<
    TWhereSchema extends z.ZodType,
    TWhereUniqueSchema extends z.ZodType,
    TOrderBySchema extends z.ZodType,
> = ISourceSchemaEx<TWhereSchema, TWhereUniqueSchema, TOrderBySchema>;

export const withSourceSchemaEx = <
    TWhereSchema extends z.ZodType,
    TWhereUniqueSchema extends z.ZodType,
    TOrderBySchema extends z.ZodType,
>(props: IWithSourceSchemaExProps<TWhereSchema, TWhereUniqueSchema, TOrderBySchema>): ISourceSchemaEx<TWhereSchema, TWhereUniqueSchema, TOrderBySchema> => {
    return props;
};
