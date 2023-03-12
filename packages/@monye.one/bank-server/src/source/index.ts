import {$PrismaClient}     from "@leight/prisma";
import {
    ISource,
    withUpsert
}                          from "@leight/source";
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

    async runUpsert(props: ISource.IUpsert<IBankSourceSchema>): Promise<IBankSourceSchema["Entity"]> {
        return this.prismaClient.bank.upsert(withUpsert(props));
    }
}
