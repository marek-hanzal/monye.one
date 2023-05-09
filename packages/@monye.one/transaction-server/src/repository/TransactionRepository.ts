import {rangeOf} from "@leight/i18n";
import {$PrismaClient, decimalOf, PrismaClient} from "@leight/prisma";
import {$UserService, type IUserService} from "@leight/user";
import {keywordsOf} from "@leight/utils";
import {ITransactionRepositorySchemaEx, type ITransactionSumBy, TransactionSource} from "@monye.one/transaction";
import {BaseTransactionRepositoryEx} from "../sdk";

export class TransactionRepository extends BaseTransactionRepositoryEx {
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

    async sumBy(filter?: TransactionSource["Type"]["Filter"]): Promise<ITransactionSumBy> {
        return {
            sum: decimalOf((await this.prisma().aggregate({
                _sum: {
                    amount: true,
                },
                where: this.toWhere({
                    ...filter,
                    isTransfer: undefined,
                }),
            }))._sum.amount || 0),
            income: decimalOf((await this.prisma().aggregate({
                _sum: {
                    amount: true,
                },
                where: this.toWhere({
                    ...filter,
                    withIncome: true,
                }),
            }))._sum.amount || 0),
            outcome: decimalOf((await this.prisma().aggregate({
                _sum: {
                    amount: true,
                },
                where: this.toWhere({
                    ...filter,
                    withOutcome: true,
                }),
            }))._sum.amount || 0),
        };
    }

    toWhere(filter?: TransactionSource["Type"]["Filter"]): ITransactionRepositorySchemaEx["Type"]["Where"] | undefined {
        if (!filter) {
            return;
        }

        const where: ITransactionRepositorySchemaEx["Type"]["Where"] = {
            AND: [],
            userId: this.userService.required(),
        };

        const {
            withRange,
            withIncome,
            withOutcome,
            fulltext,
            bankId,
            bankIds,
            target,
            from,
            to,
            rangeOf: $rangeOf,
            amountFrom,
            amountTo,
            account,
            isTransfer,
        } = filter;
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
                                                mode: "insensitive",
                                            },
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
            ]) : [];
        }

        const $range = rangeOf({range: $rangeOf});
        if ($range) {
            where["AND"] = Array.isArray(where["AND"]) ? where["AND"].concat([
                {
                    date: {gte: $range.from.toJSDate()},
                },
                {
                    date: {lte: $range.to.toJSDate()},
                },
            ]) : [];
        } else {
            if (from) {
                where["AND"] = Array.isArray(where["AND"]) ? where["AND"].concat([
                    {
                        date: {gte: from},
                    },
                ]) : [];
            }

            if (to) {
                where["AND"] = Array.isArray(where["AND"]) ? where["AND"].concat([
                    {
                        date: {lte: to},
                    },
                ]) : [];
            }
        }

        if (amountFrom) {
            where["AND"] = Array.isArray(where["AND"]) ? where["AND"].concat([
                {
                    amount: {gte: amountFrom},
                },
            ]) : [];
        }

        if (isTransfer !== undefined) {
            where["AND"] = Array.isArray(where["AND"]) ? where["AND"].concat([
                {
                    isTransfer,
                },
            ]) : [];
        }

        if (amountTo) {
            where["AND"] = Array.isArray(where["AND"]) ? where["AND"].concat([
                {
                    amount: {lte: amountTo},
                },
            ]) : [];
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
                },
            ]) : [];
        }

        if (bankId) {
            where["AND"] = Array.isArray(where["AND"]) ? where["AND"].concat([
                {
                    bankId,
                },
            ]) : [];
        }

        if (account) {
            where["AND"] = Array.isArray(where["AND"]) ? where["AND"].concat([
                {
                    bank: {
                        account,
                    },
                },
            ]) : [];
        }

        if (target) {
            where["AND"] = Array.isArray(where["AND"]) ? where["AND"].concat([
                {
                    target: {
                        contains: target,
                        mode: "insensitive",
                    },
                },
            ]) : [];
        }

        if (bankIds && bankIds.length) {
            where["AND"] = Array.isArray(where["AND"]) ? where["AND"].concat([
                {
                    bankId: {
                        in: bankIds,
                    },
                },
            ]) : [];
        }

        return where;
    }

    toWhereUnique(filter: TransactionSource["Type"]["Filter"]): ITransactionRepositorySchemaEx["Type"]["WhereUnique"] {
        const {
            id,
            userId_reference,
        } = filter;

        if (userId_reference) {
            return {
                userId_reference,
            };
        }

        if (id) {
            return {
                id,
            };
        }

        return {};
    }
}
