import {type ISource}           from "@leight/source";
import {type IFileSourceSchema} from "../schema";

export interface IFileSource extends ISource<IFileSourceSchema> {
}

export const $FileSource = Symbol.for("@leight/file/IFileSource");
