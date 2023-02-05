import {type ISourceConfig} from "@leight/source";
import {type IPrisma, type Transaction} from "@monye.one/prisma";

export interface ITransactionSourceConfig extends ISourceConfig<
    Transaction,
    IPrisma.TransactionCreateInput,
    IPrisma.TransactionUpdateInput,
    IPrisma.TransactionWhereInput,
    IPrisma.TransactionOrderByWithRelationInput
> {
}
