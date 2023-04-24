import {
    $JobExecutor,
    type IJobExecutor,
    type IJobParamValidator,
    type IJobService
}                           from "@leight/job";
import {AbstractJobService} from "@leight/job-server";
import {expand}             from "@leight/utils-server";
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
    ITransactionSource
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
            filter: {
                bankId,
            },
        });

        await jobProgress.setTotal(total);

        for (const transaction of await this.transactionSource.query({filter: {bankId}})) {
            try {
                console.log(expand(await this.transactionKeywordService.build(transaction)));
                await jobProgress.onSuccess();
            } catch (e) {
                await jobProgress.onSkip();
            }
        }

        return;
    }

    validator(): IJobParamValidator {
        return BankStatsParamsSchema;
    }
}
