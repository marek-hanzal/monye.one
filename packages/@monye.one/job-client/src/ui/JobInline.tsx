import {
    type IJobInlineProps as ICoolJobInlineProps,
    JobInline as CoolJobInline,
}                from "@leight/job-client";
import {trpc}    from "@monye.one/trpc-client";
import {type FC} from "react";

export interface IJobInlineProps extends ICoolJobInlineProps {
}

export const JobInline: FC<IJobInlineProps> = props => {
    return <CoolJobInline
        useJobFindQuery={trpc.job.source.find.useQuery}
        {...props}
    />;
};
