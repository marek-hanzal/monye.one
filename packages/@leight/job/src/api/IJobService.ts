import {type ILogger}              from "@leight/winston";
import {type IJobSourceSchemaType} from "../sdk";
import {type IJobProgress}         from "./IJobProgress";

export interface IJobService<TSourceSchemaType extends IJobSourceSchemaType, TResult = any> {
    name: string;

    async(props: IJobService.IHandleProps<TSourceSchemaType>): Promise<TSourceSchemaType["Dto"]>;

    handle(props: IJobService.IHandleProps<TSourceSchemaType>): Promise<TResult>;
}

export namespace IJobService {
    export interface IAsyncProps<TSourceSchemaType extends IJobSourceSchemaType> {
        params: TSourceSchemaType["Dto"]["params"];
    }

    export interface IHandleProps<TSourceSchemaType extends IJobSourceSchemaType> {
        name: string;
        job: TSourceSchemaType["Dto"];
        params: TSourceSchemaType["Dto"]["params"];
        userId?: string | null;
        jobProgress: IJobProgress;
        logger: ILogger;

        progress<TResult>(callback: () => Promise<TResult>, sleep?: number): Promise<TResult>;
    }
}
