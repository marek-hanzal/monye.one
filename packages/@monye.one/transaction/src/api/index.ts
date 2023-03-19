import {type IImportService} from "@leight/import";
import {
    type ISource,
    type ISourceSchema
}                            from "@leight/source";
import {
    type ITransactionCreateSchema,
    type ITransactionFilterSchema,
    type ITransactionImport,
    type ITransactionParamSchema,
    type ITransactionPatchSchema,
    type ITransactionSchema,
    type ITransactionSortSchema,
}                            from "../schema";

export interface ITransactionImportService extends IImportService<ITransactionImport> {
}

export const $TransactionImportService = Symbol.for(
    "@monye.one/transaction/ITransactionImportService"
);

export interface ITransactionSource extends ISource<ITransactionSourceSchema> {
}

export const $TransactionSource = Symbol.for(
    "@monye.one/transaction/ITransactionSource"
);

export interface ITransactionSourceSchema extends ISourceSchema<
    ITransactionSchema,
    ITransactionCreateSchema,
    ITransactionPatchSchema,
    ITransactionFilterSchema,
    ITransactionSortSchema,
    ITransactionParamSchema
> {
}
