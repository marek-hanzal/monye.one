import {$PrismaClient, PrismaClient} from "@leight/prisma";
import {$UserService, type IUserService} from "@leight/user";
import {ITransactionKeywordRepositorySchemaEx, TransactionKeywordSource} from "@monye.one/transaction";
import {BaseTransactionKeywordRepositoryEx} from "../sdk";

export class TransactionKeywordRepository extends BaseTransactionKeywordRepositoryEx {
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

    toWhere(filter?: TransactionKeywordSource["Type"]["Filter"]): ITransactionKeywordRepositorySchemaEx["Type"]["Where"] | undefined {
        if (!filter) {
            return;
        }

        const {transactionId} = filter;

        return {
            transactionId,
        };
    }
}
