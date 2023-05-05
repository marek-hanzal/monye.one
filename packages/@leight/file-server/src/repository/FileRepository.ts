import {
    type IFilePrismaSchemaType,
    type IFileSourceSchemaType
}                             from "@leight/file";
import {BaseFileRepositoryEx} from "../sdk";

export class FileRepository extends BaseFileRepositoryEx {
    toWhereUnique(filter: IFileSourceSchemaType["Filter"]): IFilePrismaSchemaType["WhereUnique"] {
        return {
            userId_path_name: filter.userId_path_name,
        };
    }
}
