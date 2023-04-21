import {
    type IJobService,
    type IJobSourceSchemaType
} from "@leight/job";

export abstract class AbstractJobService<TSourceSchemaType extends IJobSourceSchemaType, TResult> implements IJobService<TSourceSchemaType, TResult> {
    protected constructor(public name: string) {
        this.name = name;
    }

    abstract async(props: IJobService.IAsyncProps<TSourceSchemaType>): Promise<TSourceSchemaType["Dto"]>;

    abstract handle(props: IJobService.IHandleProps<TSourceSchemaType>): Promise<TResult>;
}
