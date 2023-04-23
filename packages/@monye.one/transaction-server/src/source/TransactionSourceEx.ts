import {
    $PrismaClient,
    PrismaClient
}                                    from "@leight/prisma";
import {
    $UserService,
    type IUserService
}                                    from "@leight/user";
import {keywordsOf}                  from "@leight/utils";
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

        const where: ITransactionPrismaSchemaType["Where"] = {
            AND:    [],
            userId: this.userService.required(),
        };

        const {withRange, fulltext} = filter;
        const $fulltext             = keywordsOf(fulltext);
        if ($fulltext) {
            where["AND"] = Array.isArray(where["AND"]) ? where["AND"].concat([
                {
                    OR: $fulltext?.map(item => ({
                        OR: [
                            {
                                note: {
                                    contains: item,
                                    mode:     "insensitive",
                                }
                            },
                            {
                                variable: {
                                    contains: item,
                                    mode:     "insensitive",
                                }
                            },
                            {
                                symbol: {
                                    contains: item,
                                    mode:     "insensitive",
                                }
                            },
                            {
                                static: {
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
                            {
                                bank: {
                                    account: {
                                        contains: item,
                                        mode:     "insensitive",
                                    },
                                },
                            },
                            {
                                bank: {
                                    description: {
                                        contains: item,
                                        mode:     "insensitive",
                                    },
                                },
                            },
                        ]
                    })),
                }
            ]) : [];
        }

        if (withRange) {
            where["AND"] = Array.isArray(where["AND"]) ? where["AND"].concat([
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
            ].filter(Boolean)) : [];
        }

        return where;
    }

    toWhereUnique(filter: ITransactionSourceSchemaType["Filter"]): ITransactionPrismaSchemaType["WhereUnique"] {
        return {
            userId_reference: filter.userId_reference,
        };
    }
}
