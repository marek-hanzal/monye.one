import {type ISourceConfig} from "@leight/source";
import {
    type IPrisma,
    type Schema
}                           from "@monye.one/prisma";

export interface ITransactionSourceConfig extends ISourceConfig<
    Schema.Transaction,
    IPrisma.TransactionCreateInput,
    IPrisma.TransactionUpdateInput,
    IPrisma.TransactionWhereInput,
    IPrisma.TransactionOrderByWithRelationInput
> {
}
