import {
    type IFilePrismaSchemaType,
    type IFileSourceSchemaType
}                             from "@leight/file";
import {FileBasePrismaSource} from "../sdk/Source/FileBasePrismaSource";

export class FileSource extends FileBasePrismaSource {
    toWhereUnique(filter: IFileSourceSchemaType["Filter"]): IFilePrismaSchemaType["WhereUnique"] {
        return {
            userId_path_name: filter.userId_path_name,
        };
    }
}
