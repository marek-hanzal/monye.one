import {$PrismaClient}      from "@leight/prisma";
import {AbstractSource}     from "@leight/source-server";
import {
    $BankSource,
    type IBankSource,
    IBankSourceSchema,
}                           from "@monye.one/bank";
import {type IPrismaClient} from "@monye.one/prisma";
import {
    inject,
    injectable
}                           from "tsyringe";

@injectable()
export class BankSource extends AbstractSource<IBankSourceSchema> implements IBankSource {
    constructor(
        @inject($PrismaClient) protected prismaClient: IPrismaClient,
    ) {
        super($BankSource);
    }
}
