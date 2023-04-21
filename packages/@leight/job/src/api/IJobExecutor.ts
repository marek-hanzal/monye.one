import {type BindKey}              from "@leight/container";
import {type IJobSourceSchemaType} from "../sdk";

export interface IJobExecutor {
    execute<TSourceSchemaType extends IJobSourceSchemaType>(props: IJobExecutor.IExecuteProps<TSourceSchemaType>): Promise<TSourceSchemaType["Dto"]>;
}

export namespace IJobExecutor {
    export interface IExecuteProps<TSourceSchemaType extends IJobSourceSchemaType> {
        service: BindKey;
        params: TSourceSchemaType["Dto"]["params"];
    }
}

export const $JobExecutor = Symbol.for(
    "@leight/job/IJobExecutor"
);
