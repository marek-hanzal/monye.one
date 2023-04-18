/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	BankSchema as $EntitySchema,
	BankOptionalDefaultsSchema,
	BankPartialSchema,
	BankWhereInputSchema,
	BankWhereUniqueInputSchema,
	BankOrderByWithRelationInputSchema
} from "@monye.one/prisma";
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
	ToPatchSchema
} from "@leight/source";
import {z} from "@leight/zod";
import {BankToCreateSchemaEx} from "../schema";
import {ParamsSchema} from "@leight/query";

export type IBankSourceSchema = InferSourceSchema<typeof BankSourceSchema>;
export type IBankPrismaSchema = InferSourceExSchema<typeof BankPrismaSchema>;
export type IUseBankSourceQuery = IUseSourceQuery<IBankSourceSchema>;

export interface IBankSource extends ISource<IBankSourceSchema> {
}

export const BankPrismaSchema = withSourceExSchema({
    WhereSchema:       BankWhereInputSchema,
    WhereUniqueSchema: BankWhereUniqueInputSchema,
    OrderBySchema:     BankOrderByWithRelationInputSchema,
});
export const BankSourceSchema = withSourceSchema({
    EntitySchema: $EntitySchema,
    ToCreateSchema: BankToCreateSchemaEx,
    CreateSchema: BankOptionalDefaultsSchema,
    ToPatchSchema: ToPatchSchema,
    PatchSchema: BankPartialSchema.merge(WithIdentitySchema),
    FilterSchema: z.union([
        BankWhereInputSchema,
        BankWhereUniqueInputSchema,
        FilterSchema,
    ]),
    ParamsSchema: ParamsSchema,
    SortSchema: z.object({
        account: SortOrderSchema
    }),
});
export const $BankSource = Symbol.for("@monye.one/bank/IBankSource");
export const BankSourceContext = (container: IContainer) => new ServiceContext<IBankSource>(container, $BankSource);
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_akkydkmf2dl7tdk8yl3wsm9y = true;