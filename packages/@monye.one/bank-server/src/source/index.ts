import {$PrismaClient}     from "@leight/prisma";
import {AbstractSource}    from "@leight/source-server";
import {
    $BankSource,
    type IBankSource,
    IBankSourceSchema,
}                          from "@monye.one/bank";
import {type PrismaClient} from "@monye.one/prisma";

export class BankSource extends AbstractSource<IBankSourceSchema> implements IBankSource {
    static inject = [
        $PrismaClient,
    ];

    constructor(
        protected prismaClient: PrismaClient,
    ) {
        super($BankSource);
    }
}
