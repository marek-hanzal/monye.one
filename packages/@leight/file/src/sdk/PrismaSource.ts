/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	FileSchema as $EntitySchema,
	FileOptionalDefaultsSchema,
	FilePartialSchema,
	FileWhereInputSchema,
	FileWhereUniqueInputSchema,
	FileOrderByWithRelationInputSchema
} from "@leight/prisma";
import {FilterSchema} from "@leight/filter";
import {SortOrderSchema} from "@leight/sort";
import {
	type IContainer,
	ServiceContext
} from "@leight/container";
import {
	withSourceExSchema,
	type InferSourceExSchema,
	type IUseSourceQuery,
	WithIdentitySchema,
	type ISource,
	type InferSourceSchema,
	withSourceSchema,
	ToCreateSchema,
	ToPatchSchema
} from "@leight/source";
import {z} from "@leight/zod";
import {ParamsSchema} from "@leight/query";

export type IFileSourceSchema = InferSourceSchema<typeof FileSourceSchema>;
export type IFilePrismaSchema = InferSourceExSchema<typeof FilePrismaSchema>;
export type IUseFileSourceQuery = IUseSourceQuery<IFileSourceSchema>;

export interface IFileSource extends ISource<IFileSourceSchema> {
}

export const FilePrismaSchema = withSourceExSchema({
    WhereSchema:       FileWhereInputSchema,
    WhereUniqueSchema: FileWhereUniqueInputSchema,
    OrderBySchema:     FileOrderByWithRelationInputSchema,
});
export const FileSourceSchema = withSourceSchema({
    EntitySchema: $EntitySchema,
    ToCreateSchema: ToCreateSchema,
    CreateSchema: FileOptionalDefaultsSchema,
    ToPatchSchema: ToPatchSchema,
    PatchSchema: FilePartialSchema.merge(WithIdentitySchema),
    FilterSchema: z.union([
        FileWhereInputSchema,
        FileWhereUniqueInputSchema,
        FilterSchema,
    ]),
    ParamsSchema: ParamsSchema,
    SortSchema: z.object({
        id: SortOrderSchema
    }),
});
export const $FileSource = Symbol.for("@leight/file/IFileSource");
export const FileSourceContext = (container: IContainer) => new ServiceContext<IFileSource>(container, $FileSource);
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_dc95inmx4w1f2ahle2fuacvt = true;