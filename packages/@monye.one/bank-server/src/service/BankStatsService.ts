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
        console.log("Yaaay!", bankId);
        return Promise.resolve(undefined);
    }

    validator(): IJobParamValidator {
        return BankStatsParamsSchema;
    }
}
