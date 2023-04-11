import {
    $PrismaClient,
    PrismaClient
}                                    from "@leight/prisma";
import {
    $UserService,
    type IUserService
}                                    from "@leight/user";
import {
    type ITransactionSourceSchema,
    type ITransactionWhere
}                                    from "@monye.one/transaction";
import {TransactionBasePrismaSource} from "../sdk/ServerPrismaSource";

export class TransactionSourceEx extends TransactionBasePrismaSource {
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

    toWhere(filter?: ITransactionSourceSchema["Filter"]): ITransactionWhere | undefined {
        if (!filter) {
            return;
        }
        return {
            ...filter,
            userId: this.userService.required(),
        };
    }
}
