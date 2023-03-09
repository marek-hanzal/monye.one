import {
    $PrismaClient,
    AbstractPrismaSource
}                           from "@leight/prisma";
import {type IPrismaClient} from "@monye.one/prisma";
import {
    $TransactionSource,
    type ITransactionSource,
    type ITransactionSourceConfig
}                           from "@monye.one/transaction";
import {
    inject,
    injectable
}                           from "tsyringe";

@injectable()
export class TransactionSource extends AbstractPrismaSource<ITransactionSourceConfig, IPrismaClient["transaction"]> implements ITransactionSource {
    constructor(
        @inject($PrismaClient) protected prismaClient: IPrismaClient,
    ) {
        super($TransactionSource, prismaClient.transaction);
    }
}
