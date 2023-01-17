import {type IJob} from "@leight/job";

export interface IImportJob extends IJob<{ file: string }> {
}
