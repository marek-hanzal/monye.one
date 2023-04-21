import {type IJobWithParams} from "@leight/job";
import {withHandler}         from "@leight/trpc-server";
import {
    $BankStatsService,
    type IBankStatsParams,
    type IBankStatsParamsSchema,
    type IBankStatsService
}                            from "@monye.one/bank";

export const BankStatsProcedure = withHandler<IBankStatsParams, IJobWithParams<IBankStatsParamsSchema>>({
    handler: ({container, request}) => container.resolve<IBankStatsService>($BankStatsService).async({params: request}),
});
