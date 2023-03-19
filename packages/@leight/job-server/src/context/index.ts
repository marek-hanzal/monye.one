import {
    type IContainer,
    ServiceContext
} from "@leight/container";
import {
    $JobSource,
    type IJobSource
} from "@leight/job";

export const JobSourceContext = (container: IContainer) => new ServiceContext<IJobSource>(container, $JobSource);
