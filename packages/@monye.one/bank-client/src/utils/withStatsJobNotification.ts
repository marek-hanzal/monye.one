import {type IJobSourceSchemaType} from "@leight/job";
import {withJobNotification} from "@leight/job-client";
import {type IBankSourceSchemaType} from "@monye.one/bank";
import {trpc} from "@monye.one/trpc-client";

export interface IWithStatsJobNotificationProps {
    bank: IBankSourceSchemaType["Dto"];
}

export const withStatsJobNotification = (
    {
        bank
    }: IWithStatsJobNotificationProps) => {
    return {
        onSuccess(job: IJobSourceSchemaType["Dto"]) {
            withJobNotification({
                job,
                withTranslation: {
                    namespace: "bank",
                    label:     "stats.update",
                    values:    bank,
                },
                useJobGetQuery: trpc.job.source.find.useQuery,
            });
        }
    };
};
