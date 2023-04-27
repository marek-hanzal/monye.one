import {
    $PrismaClient,
    decimalOf,
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
    type ITransactionSumBy,
}                                    from "@monye.one/transaction";
import {TransactionBasePrismaSource} from "../sdk/Source/TransactionBasePrismaSource";

export class TransactionSource extends TransactionBasePrismaSource {
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

    async sumBy(filter?: ITransactionSourceSchemaType["Filter"]): Promise<ITransactionSumBy> {
        return {
            sum:     decimalOf((await this.prisma().aggregate({
                _sum:  {
                    amount: true,
                },
                where: this.toWhere(filter),
            }))._sum.amount || 0),
            income:  decimalOf((await this.prisma().aggregate({
                _sum:  {
                    amount: true,
                },
                where: this.toWhere({
                    ...filter,
                    withIncome: true,
                }),
            }))._sum.amount || 0),
            outcome: decimalOf((await this.prisma().aggregate({
                _sum:  {
                    amount: true,
                },
                where: this.toWhere({
                    ...filter,
                    withOutcome: true,
                }),
            }))._sum.amount || 0),
        };
    }

    toWhere(filter?: ITransactionSourceSchemaType["Filter"]): ITransactionPrismaSchemaType["Where"] | undefined {
        if (!filter) {
            return;
        }

        const where: ITransactionPrismaSchemaType["Where"] = {
            AND:    [],
            userId: this.userService.required(),
        };

        const {
                  withRange,
                  withIncome,
                  withOutcome,
                  fulltext,
                  bankId,
              }         = filter;
        const $fulltext = keywordsOf(fulltext);
        if ($fulltext) {
            where["AND"] = Array.isArray(where["AND"]) ? where["AND"].concat([
                {
                    OR: $fulltext?.map(item => ({
                        OR: [
                            {
                                TransactionKeyword: {
                                    some: {
                                        keyword: {
                                            text: {
                                                contains: item,
                                                mode:     "insensitive",
                                            }
                                        }
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
            ].filter(Boolean)) : [];
        }
        if (withIncome) {
            where["AND"] = Array.isArray(where["AND"]) ? where["AND"].concat([
                {
                    amount: {
                        gt: 0,
                    },
                }
            ]) : [];
        }
        if (withOutcome) {
            where["AND"] = Array.isArray(where["AND"]) ? where["AND"].concat([
                {
                    amount: {
                        lt: 0,
                    },
                }
            ]) : [];
        }
        if (bankId) {
            where["AND"] = Array.isArray(where["AND"]) ? where["AND"].concat([
                {
                    bankId,
                }
            ]) : [];
        }

        return where;
    }

    toWhereUnique(filter: ITransactionSourceSchemaType["Filter"]): ITransactionPrismaSchemaType["WhereUnique"] {
        return {
            userId_reference: filter.userId_reference,
        };
    }
}
