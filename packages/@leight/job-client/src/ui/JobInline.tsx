import {type IWithTranslation} from "@leight/i18n";
import {useTranslation}        from "@leight/i18n-client";
import {
    type IJob,
    type IUseJobFindQuery,
    JobDoneStatus
}                              from "@leight/job";
import {toHumanNumber}         from "@leight/utils";
import {Progress}              from "@mantine/core";
import {notifications}         from "@mantine/notifications";
import {
    IconAlertTriangle,
    IconCheck,
    IconExclamationCircle
}                              from "@tabler/icons-react";
import {
    type FC,
    useState
}                              from "react";

export interface IJobInlineInternalProps {
    withTranslation: IWithTranslation;
    job: IJob;
    useJobFindQuery: IUseJobFindQuery;

    onSuccess?(props: IJobInlineInternalProps.IOnSuccessProps): void;
}

export namespace IJobInlineInternalProps {
    export interface IOnSuccessProps {
        job: IJob;
    }
}

export type IJobInlineProps = Omit<IJobInlineInternalProps, "useJobFindQuery">;

export const JobInline: FC<IJobInlineInternalProps> = (
    {
        job,
        useJobFindQuery,
        onSuccess,
        withTranslation: {namespace},
    }) => {
    const {t}                   = useTranslation(namespace);
    const [refresh, setRefresh] = useState(true);
    const result                = useJobFindQuery({id: job.id}, {
        initialData:     job,
        refetchInterval: refresh ? 750 : undefined,
        onSuccess:       job => {
            const isDone = JobDoneStatus.includes(job.status);
            isDone && setTimeout(() => {
                switch (job.status) {
                    case "SUCCESS":
                        onSuccess?.({job});
                        notifications.update({
                            id:      job.id,
                            icon:    <IconCheck size={"1.1rem"}/>,
                            color:   "teal",
                            title:   t("job.success.title"),
                            message: t("job.success.message"),
                        });
                        break;
                    case "REVIEW":
                        notifications.update({
                            id:        job.id,
                            icon:      <IconAlertTriangle size={"1.1rem"}/>,
                            color:     "orange",
                            title:     t("job.review.title"),
                            message:   t("job.review.message"),
                            autoClose: false,
                        });
                        break;
                    case "FAILURE":
                        notifications.update({
                            id:        job.id,
                            icon:      <IconExclamationCircle size={"1.1rem"}/>,
                            color:     "red",
                            title:     t("job.failure.title"),
                            message:   t("job.failure.message"),
                            autoClose: false,
                        });
                        break;
                }
            }, 750);
            setRefresh(!isDone);
        }
    });

    return result.isSuccess ? <>
        <Progress
            color={"green"}
            striped
            animate
            value={result.data.progress}
        />
        {toHumanNumber({number: result.data.progress})}%
    </> : null;
};
