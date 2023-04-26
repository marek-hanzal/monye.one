/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	BankSchema as $EntitySchema,
	BankOptionalDefaultsSchema,
	BankPartialSchema
} from "@monye.one/prisma";
import {
	SortOrderSchema,
	FilterSchema,
	withSourceSchema,
	type ISourceSchemaType,
	PatchSchema,
	ParamsSchema
} from "@leight/source";
import {z} from "@leight/zod";
import {
	BankSchemaEx,
	BankToCreateSchemaEx,
	BankToPatchSchemaEx,
	BankFilterSchemaEx
} from "../../schema";

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
    FilterSchema: FilterSchema.merge(BankFilterSchemaEx),
    ParamsSchema: ParamsSchema,
    SortSchema: z.object({
        account: SortOrderSchema
    }),
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_burjysfhyubs8gnfdnjgde14 = true;