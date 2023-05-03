import {
    $JobExecutor,
    type IJobExecutor,
    type IJobParamValidator,
    type IJobService
}                           from "@leight/job";
import {AbstractJobService} from "@leight/job-server";
import {decimalOf}          from "@leight/prisma";
import {
    $BankStatsService,
    BankStatsParamsSchema,
    type IBankStatsParamsSchema,
    type IBankStatsService
}                           from "@monye.one/bank";
import {
    $TransactionKeywordService,
    $TransactionSource,
    type ITransactionKeywordService,
    type ITransactionSource
}                           from "@monye.one/transaction";

export class BankStatsService extends AbstractJobService<IBankStatsParamsSchema, void> implements IBankStatsService {
    static inject = [
        $JobExecutor,
        $TransactionKeywordService,
        $TransactionSource,
    ];

    constructor(
        jobExecutor: IJobExecutor,
        protected transactionKeywordService: ITransactionKeywordService,
        protected transactionSource: ITransactionSource,
    ) {
        super($BankStatsService, jobExecutor);
    }

    async handle(
        {
            params: {bankId},
            jobProgress,
        }: IJobService.IHandleProps<IBankStatsParamsSchema>): Promise<void> {
        let total = 0;
        total += await this.transactionSource.count({
            filter: {bankId},
        });

        await jobProgress.setTotal(total);

        for (const transaction of await this.transactionSource.query({filter: {bankId}})) {
            try {
                await this.transactionKeywordService.build({input: transaction});

                {
                    const {target} = transaction;
                    const amount   = decimalOf(transaction.amount);
                    if (transaction.target) {
                        if (!transaction.fromId && amount > 0) {
                            /**
                             * From
                             */
                            const targetAmount = amount * -1;
                            const from         = await this.transactionSource.fetchOptional({
                                filter: {
                                    amountFrom: targetAmount,
                                    amountTo:   targetAmount,
                                    account:    target,
                                    withoutTo:  true,
                                },
                            });
                            if (from) {
                                await this.transactionSource.patch({
                                    patch:  {
                                        fromId: from.id,
                                    },
                                    filter: {
                                        id: transaction.id,
                                    },
                                });
                                await this.transactionSource.patch({
                                    patch:  {
                                        toId: transaction.id,
                                    },
                                    filter: {
                                        id: from.id,
                                    },
                                });
                            }
                        } else if (!transaction.toId) {
                            /**
                             * To
                             */
                            const targetAmount = Math.abs(amount);
                            const to           = await this.transactionSource.fetchOptional({
                                filter: {
                                    amountFrom:  targetAmount,
                                    amountTo:    targetAmount,
                                    account:     target,
                                    withoutFrom: true,
                                },
                            });
                            if (to) {
                                await this.transactionSource.patch({
                                    patch:  {
                                        toId: to.id,
                                    },
                                    filter: {
                                        id: transaction.id,
                                    },
                                });
                                await this.transactionSource.patch({
                                    patch:  {
                                        fromId: transaction.id,
                                    },
                                    filter: {
                                        id: to.id,
                                    },
                                });
                            }
                        }
                    }
                }

                await jobProgress.onSuccess();
            } catch (e) {
                console.error(e);
                await jobProgress.onSkip();
            }
        }

        return;
    }

    validator(): IJobParamValidator {
        return BankStatsParamsSchema;
    }
}
