import fs              from "node:fs";
import {createRequire} from "node:module";

export const withImport = (what: string, source: string, encoding: BufferEncoding = "utf8") => {
    return fs.readFileSync(createRequire(source).resolve(what), {encoding});
};
