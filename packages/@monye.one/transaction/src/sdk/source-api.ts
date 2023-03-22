// Generated file
import {
	type ISource,
	type ISourceSchema
} from "@leight/source";
import {
	type ITransactionCreateSchema,
	type ITransactionFilterSchema,
	type ITransactionParamSchema,
	type ITransactionPatchSchema,
	type ITransactionSchema,
	type ITransactionSortSchema
} from "./entity-schema";

export interface ITransactionSource extends ISource<ITransactionSourceSchema> {
}

export interface ITransactionSourceSchema extends ISourceSchema<
    ITransactionSchema,
    ITransactionCreateSchema,
    ITransactionPatchSchema,
    ITransactionFilterSchema,
    ITransactionSortSchema,
    ITransactionParamSchema
 > {
}

export const $TransactionSource = Symbol.for("@monye.one/transaction/ITransactionSource");