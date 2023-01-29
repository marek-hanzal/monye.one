import {type IJob} from "@leight/job";

export interface IImportJobParams {
    fileId: string;
}

export interface IImportJob extends IJob<IImportJobParams> {
}
