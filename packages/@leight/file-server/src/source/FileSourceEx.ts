import {
    type IFilePrismaSchemaType,
    type IFileSourceSchemaType
}                             from "@leight/file";
import {FileBasePrismaSource} from "../sdk/PrismaSource/FilePrismaSource";

export class FileSourceEx extends FileBasePrismaSource {
    toWhereUnique(filter: IFileSourceSchemaType["Filter"]): IFilePrismaSchemaType["WhereUnique"] {
        return {
            userId_path_name: filter.userId_path_name,
        };
    }
}