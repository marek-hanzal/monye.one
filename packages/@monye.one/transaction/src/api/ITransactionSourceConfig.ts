import {type ISourceConfig} from "@leight/source";
import {type IPrisma, type Transaction} from "@monye.one/prisma";

export interface ITransactionEntity extends Transaction {
}

export interface ITransactionSourceConfig extends ISourceConfig<
    ITransactionEntity,
    IPrisma.TransactionCreateInput,
    IPrisma.TransactionUpdateInput,
    IPrisma.TransactionWhereInput,
    IPrisma.TransactionOrderByWithRelationInput
> {
}
