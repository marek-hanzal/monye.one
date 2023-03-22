// Generated file
import {
	type ISource,
	type ISourceSchema
} from "@leight/source";
import {
	type IBankCreateSchema,
	type IBankFilterSchema,
	type IBankParamSchema,
	type IBankPatchSchema,
	type IBankSchema,
	type IBankSortSchema
} from "./entity-schema";

export interface IBankSource extends ISource<IBankSourceSchema> {
}

export interface IBankSourceSchema extends ISourceSchema<
    IBankSchema,
    IBankCreateSchema,
    IBankPatchSchema,
    IBankFilterSchema,
    IBankSortSchema,
    IBankParamSchema
 > {
}

export const $BankSource = Symbol.for("@monye.one/bank/IBankSource");