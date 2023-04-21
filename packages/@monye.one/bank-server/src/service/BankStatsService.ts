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

export class BankStatsService extends AbstractJobService<IBankStatsParamsSchema, void> implements IBankStatsService {
    static inject = [
        $JobExecutor,
    ];

    constructor(
        jobExecutor: IJobExecutor
    ) {
        super($BankStatsService, jobExecutor);
    }

    async handle(
        {
            params: {bankId},
            jobProgress,
        }: IJobService.IHandleProps<IBankStatsParamsSchema>): Promise<void> {
        setTimeout(() => {
            jobProgress.setTotal(20);
        }, 1200);
        setTimeout(() => {
            jobProgress.onSuccess();
            jobProgress.onSuccess();
            jobProgress.onSuccess();
        }, 4670);
        return new Promise(resolve => {
            setTimeout(() => {
                console.log("Yaaay!", bankId);
                resolve();
            }, 10000);
        });
    }

    validator(): IJobParamValidator {
        return BankStatsParamsSchema;
    }
}
