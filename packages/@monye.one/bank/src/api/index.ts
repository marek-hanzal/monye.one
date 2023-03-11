import {
    type ISource,
    type ISourceSchema
} from "@leight/source";
import {
    type IBankCreateSchema,
    type IBankPatchSchema,
    type IBankSchema
} from "../schema";

export interface IBankSource extends ISource<IBankSourceSchema> {
}

export const $BankSource = Symbol.for("@monye.one/bank/IBankSource");

export interface IBankSourceSchema extends ISourceSchema<
    IBankSchema,
    IBankCreateSchema,
    IBankPatchSchema
> {
}
