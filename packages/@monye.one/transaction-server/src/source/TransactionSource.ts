import {$TransactionSource, type ITransactionSource, type ITransactionSourceConfig} from "@monye.one/transaction";
import {inject, injectable} from "tsyringe";
import {type IPrismaClient} from "@monye.one/prisma";
import {$PrismaClient, AbstractPrismaSource} from "@leight/prisma";

@injectable()
export class TransactionSource extends AbstractPrismaSource<ITransactionSourceConfig, IPrismaClient['transaction']> implements ITransactionSource {
    constructor(
        @inject($PrismaClient) protected prismaClient: IPrismaClient,
    ) {
        super($TransactionSource, prismaClient.transaction);
    }
}
