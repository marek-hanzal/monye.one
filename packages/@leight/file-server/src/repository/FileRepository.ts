import {type FileSource, type IFileRepositorySchemaEx} from "@leight/file";
import {BaseFileRepositoryEx} from "../sdk";

export class FileRepository extends BaseFileRepositoryEx {
    toWhereUnique(filter: FileSource["Type"]["Filter"]): IFileRepositorySchemaEx["Type"]["WhereUnique"] {
        return {
            userId_path_name: filter.userId_path_name,
        };
    }
}
