import {type IJobSourceType}  from "@leight/job";
import {withJobNotification}  from "@leight/job-client";
import {type IBankSourceType} from "@monye.one/bank";
import {trpc}                 from "@monye.one/trpc-client";

export interface IWithStatsJobNotificationProps {
    bank: IBankSourceType["Dto"];
}

export const withStatsJobNotification = (
    {
        bank
    }: IWithStatsJobNotificationProps) => {
    return {
        onSuccess(job: IJobSourceType["Dto"]) {
            withJobNotification({
                job,
                withTranslation: {
                    namespace: "bank",
                    label:     "stats.update",
                    values:    bank,
                },
                useJobGetQuery:  trpc.job.repository.get.useQuery,
            });
        }
    };
};
