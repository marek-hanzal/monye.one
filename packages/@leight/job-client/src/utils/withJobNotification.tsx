import {type IWithTranslation} from "@leight/i18n";
import {Translation}           from "@leight/i18n-client";
import {
    type IJobSourceSchema,
    type JobSource
}                              from "@leight/job";
import {type ISource}          from "@leight/source";
import {notifications}         from "@mantine/notifications";
import {
    type IJobInlineProps,
    JobInline
}                              from "../ui";

export interface IWithJobNotificationProps {
    job: JobSource["Type"]["Dto"];
    withTranslation: IWithTranslation;
    useJobGetQuery: ISource.IUseRepository<IJobSourceSchema>["useGet"];
    onSuccess?: IJobInlineProps["onSuccess"];
}

export const withJobNotification = (
    {
        job,
        withTranslation,
        useJobGetQuery,
        onSuccess,
    }: IWithJobNotificationProps) => {
    notifications.show({
        id:        `job-${job.id}`,
        loading:   true,
        autoClose: false,
        title:     <Translation {...withTranslation} withLabel={"job.title"}/>,
        message:   <JobInline
                       withTranslation={withTranslation}
                       useJobGetQuery={useJobGetQuery}
                       onSuccess={onSuccess}
                       job={job}
                   />,
    });
};
