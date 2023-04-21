import {
    type IImportParamsSchema,
    type IImportResult
}                           from "@leight/import";
import {
    type IJobParamValidator,
    type IJobService
}                           from "@leight/job";
import {AbstractJobService} from "@leight/job-server";

export abstract class AbstractImportService<TParamsSchema extends IImportParamsSchema> extends AbstractJobService<TParamsSchema, IImportResult> {
    abstract handle(props: IJobService.IHandleProps<TParamsSchema>): Promise<IImportResult> ;

    abstract validator(): IJobParamValidator;
}
