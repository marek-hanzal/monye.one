import {
    $JobExecutor,
    type IJobExecutor,
    type IJobParamValidator,
    type IJobService
}                           from "@leight/job";
import {AbstractJobService} from "@leight/job-server";
import {
    $BankStatsService,
    BankStatsParamsSchema,
    type IBankStatsParamsSchema,
    type IBankStatsService
}                           from "@monye.one/bank";
import {
    $TransactionKeywordService,
    $TransactionPairService,
    $TransactionSource,
    type ITransactionKeywordService,
    type ITransactionPairService,
    type ITransactionSource
}                           from "@monye.one/transaction";

export class BankStatsService extends AbstractJobService<IBankStatsParamsSchema, void> implements IBankStatsService {
    static inject = [
        $JobExecutor,
        $TransactionKeywordService,
        $TransactionSource,
        $TransactionPairService,
    ];

    constructor(
        jobExecutor: IJobExecutor,
        protected transactionKeywordService: ITransactionKeywordService,
        protected transactionSource: ITransactionSource,
        protected transactionPairService: ITransactionPairService,
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

        await this.transactionSource.patchBy({
            patch:  {
                isTransfer: false,
            },
            filter: {
                bankId,
            },
        });

        for (const transaction of await this.transactionSource.query({filter: {bankId}})) {
            try {
                await Promise.all([
                    this.transactionKeywordService.build({input: transaction}),
                    this.transactionPairService.withTransaction(transaction),
                ]);
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
