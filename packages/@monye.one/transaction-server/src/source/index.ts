import {$PrismaClient}      from "@leight/prisma";
import {AbstractSource}     from "@leight/source-server";
import {type IPrismaClient} from "@monye.one/prisma";
import {
    $TransactionSource,
    type ITransactionSource,
    type ITransactionSourceSchema
}                           from "@monye.one/transaction";
import {
    inject,
    injectable
}                           from "tsyringe";

@injectable()
export class TransactionSource extends AbstractSource<ITransactionSourceSchema> implements ITransactionSource {
    constructor(
        @inject($PrismaClient) protected prismaClient: IPrismaClient,
    ) {
        super($TransactionSource);
    }
}
