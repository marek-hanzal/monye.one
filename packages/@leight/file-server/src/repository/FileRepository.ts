import {
    type IFileRepositoryExType,
    type IFileSourceType
}                             from "@leight/file";
import {BaseFileRepositoryEx} from "../sdk";

export class FileRepository extends BaseFileRepositoryEx {
    toWhereUnique(filter: IFileSourceType["Filter"]): IFileRepositoryExType["WhereUnique"] {
        return {
            userId_path_name: filter.userId_path_name,
        };
    }
}
