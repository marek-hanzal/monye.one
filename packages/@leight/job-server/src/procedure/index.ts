import {
    $JobSource,
    type IJobSourceSchema,
    JobQuerySchema
}                            from "@leight/job";
import {withSourceProcedure} from "@leight/trpc-server";

export const JobSourceProcedure = withSourceProcedure<IJobSourceSchema>({
    source: $JobSource,
    schema: JobQuerySchema,
});
