import {type IWithTranslation} from "@leight/i18n";
import {Translation}           from "@leight/i18n-client";
import {
    type IJobSourceSchemaType,
    type IUseJobSourceQuery
}                              from "@leight/job";
import {notifications}         from "@mantine/notifications";
import {
    type IJobInlineProps,
    JobInline
}                              from "../ui";

export interface IWithJobNotificationProps {
    job: IJobSourceSchemaType["Dto"];
    withTranslation: IWithTranslation;
    useJobFindQuery: IUseJobSourceQuery["useFind"];
    onSuccess?: IJobInlineProps["onSuccess"];
}

export const withJobNotification = (
    {
        job,
        withTranslation,
        useJobFindQuery,
        onSuccess,
    }: IWithJobNotificationProps) => {
    notifications.show({
        id:        `job-${job.id}`,
        loading:   true,
        autoClose: false,
        title:     <Translation {...withTranslation} label={`${withTranslation.label}.job.title`}/>,
        message:   <JobInline
                       withTranslation={withTranslation}
                       useJobFindQuery={useJobFindQuery}
                       onSuccess={onSuccess}
                       job={job}
                   />,
    });
};
