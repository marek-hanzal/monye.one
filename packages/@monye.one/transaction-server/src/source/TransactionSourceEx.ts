import {
    $PrismaClient,
    PrismaClient
}                                    from "@leight/prisma";
import {
    $UserService,
    type IUserService
}                                    from "@leight/user";
import {
    type ITransactionPrismaSchemaType,
    type ITransactionSourceSchemaType,
}                                    from "@monye.one/transaction";
import {TransactionBasePrismaSource} from "../sdk/PrismaSource/TransactionPrismaSource";

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

    toWhere(filter?: ITransactionSourceSchemaType["Filter"]): ITransactionPrismaSchemaType["Where"] | undefined {
        if (!filter) {
            return;
        }
        const {withRange} = filter;
        if (withRange) {
            return {
                AND:    [
                            {
                                date: {gte: withRange.from},
                            },
                            {
                                date: {lte: withRange.to},
                            },
                            withRange.withIncome ? {
                                amount: {
                                    gt: 0,
                                },
                            } : undefined,
                            withRange.withOutcome ? {
                                amount: {
                                    lt: 0,
                                },
                            } : undefined,
                        ].filter(Boolean),
                userId: this.userService.required(),
            };
        }
        return {
            ...filter,
            userId: this.userService.required(),
        };
    }

    toWhereUnique(filter: ITransactionSourceSchemaType["Filter"]): ITransactionPrismaSchemaType["WhereUnique"] {
        return {
            userId_reference: filter.userId_reference,
        };
    }
}
