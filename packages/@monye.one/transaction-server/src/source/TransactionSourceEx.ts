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
import {inspect}                     from "node:util";
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

        const where: ITransactionPrismaSchemaType["Where"] = {
            AND:    [],
            userId: this.userService.required(),
        };

        const {withRange, fulltext} = filter;
        if (fulltext) {
            const $fulltext = fulltext.split(/\s+/g).map(item => item.trim()).filter(Boolean);
            where["AND"]    = {
                AND: $fulltext.map(item => ({
                    OR: [
                        {
                            note: {
                                contains: item,
                                mode:     "insensitive",
                            }
                        },
                        {
                            target: {
                                contains: item,
                                mode:     "insensitive",
                            }
                        },
                    ]
                }))
            };
        }

        if (withRange) {
            where["AND"] = {
                AND: [
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
            };
        }

        console.log("Where", inspect(where, false, null, true));

        return where;
    }

    toWhereUnique(filter: ITransactionSourceSchemaType["Filter"]): ITransactionPrismaSchemaType["WhereUnique"] {
        return {
            userId_reference: filter.userId_reference,
        };
    }
}
