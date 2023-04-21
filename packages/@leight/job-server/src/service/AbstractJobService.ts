import {type BindKey} from "@leight/container";
import {
    $JobExecutor,
    type IJobExecutor,
    type IJobParamsSchema,
    type IJobParamValidator,
    type IJobService,
    type IJobWithParams
}                     from "@leight/job";

export abstract class AbstractJobService<TJobParamsSchema extends IJobParamsSchema, TResult> implements IJobService<TJobParamsSchema, TResult> {
    static inject = [
        $JobExecutor,
    ];

    protected constructor(
        public name: BindKey,
        protected jobExecutor: IJobExecutor,
    ) {
        this.name = name;
    }

    async async({params}: IJobService.IAsyncProps<TJobParamsSchema>): Promise<IJobWithParams<TJobParamsSchema>> {
        return this.jobExecutor.execute<TJobParamsSchema>({
            service: this.name,
            params,
        });
    }

    abstract handle(props: IJobService.IHandleProps<TJobParamsSchema>): Promise<TResult> ;

    abstract validator(): IJobParamValidator;
}
