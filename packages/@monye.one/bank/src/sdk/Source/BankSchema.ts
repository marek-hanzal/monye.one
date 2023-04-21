/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	BankWhereInputSchema,
	BankWhereUniqueInputSchema,
	BankSchema as $EntitySchema,
	BankOptionalDefaultsSchema,
	BankPartialSchema
} from "@monye.one/prisma";
import {SortOrderSchema} from "@leight/sort";
import {
	withSourceSchema,
	type ISourceSchemaType,
	PatchSchema
} from "@leight/source";
import {z} from "@leight/zod";
import {
	BankSchemaEx,
	BankToCreateSchemaEx,
	BankToPatchSchemaEx
} from "../../schema";
import {FilterSchema} from "@leight/filter";
import {ParamsSchema} from "@leight/query";

export type IBankSourceSchemaType = ISourceSchemaType.of<typeof BankSourceSchema>;

const $BankSchema = $EntitySchema;
const $BankCreateSchema = BankOptionalDefaultsSchema;
const $BankPatchSchema = BankPartialSchema.merge(PatchSchema);
export const BankSourceSchema = withSourceSchema({
    EntitySchema: $BankSchema,
    DtoSchema: BankSchemaEx,
    ToCreateSchema: BankToCreateSchemaEx,
    CreateSchema: $BankCreateSchema,
    ToPatchSchema: BankToPatchSchemaEx,
    PatchSchema: $BankPatchSchema,
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
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_sp5z3g1bui7y21wb7wqjzq12 = true;