import {
    $PrismaClient,
    PrismaClient
}                                           from "@leight/prisma";
import {
    $UserService,
    type IUserService
}                                           from "@leight/user";
import {
    type ITransactionKeywordPrismaSchemaType,
    type ITransactionKeywordSourceSchemaType,
}                                           from "@monye.one/transaction";
import {TransactionKeywordBasePrismaSource} from "../sdk/Source/TransactionKeywordBasePrismaSource";

export class TransactionKeywordSourceEx extends TransactionKeywordBasePrismaSource {
    static inject = [
        $UserService,
        $PrismaClient,
    ];

    constructor(
        protected userService: IUserService,
        protected prismaClient: PrismaClient,
    ) {
        super(prismaClient);
    }

    toWhere(filter?: ITransactionKeywordSourceSchemaType["Filter"]): ITransactionKeywordPrismaSchemaType["Where"] | undefined {
        if (!filter) {
            return;
        }

        const {transactionId} = filter;

        return {
            transactionId,
        };
    }
}
