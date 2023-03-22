import {
    type IExportable,
    type IWithConsts,
    type IWithImports,
    type IWithTypes
}                from "@leight/generator";
import {
    appendFileSync,
    existsSync,
    mkdirSync,
    readFileSync,
    writeFileSync
}                from "node:fs";
import {
    basename,
    dirname,
    normalize
}                from "node:path";
import {Consts}  from "./Consts";
import {Imports} from "./Imports";
import {Types}   from "./Types";

export class File implements IExportable {
    public readonly $imports: Imports;
    public readonly $consts: Consts;
    public readonly $types: Types;
    public readonly $blocks: string[];

    constructor() {
        this.$imports = new Imports();
        this.$consts  = new Consts();
        this.$types   = new Types();
        this.$blocks  = [];
    }

    public withImports({imports}: IWithImports) {
        Object.entries(imports).map(([key, value]) => this.$imports.withImport(key, value));
        return this;
    }

    public withConsts({consts = {}, exports = {}}: IWithConsts) {
        Object.entries(consts).map(([key, value]) => this.$consts.const(key, value, false));
        Object.entries(exports).map(([key, value]) => this.$consts.const(key, value, true));
        return this;
    }

    public withTypes({types = {}, exports = {}}: IWithTypes) {
        Object.entries(types).map(([key, value]) => this.$types.type(key, value, false));
        Object.entries(exports).map(([key, value]) => this.$types.type(key, value, true));
        return this;
    }

    public block(block: string) {
        this.$blocks.push(block.trim());
        return this;
    }

    public export() {
        return `
${this.$imports.export()}

${this.$consts.export()}

${this.$types.export()}

${this.$blocks.join("\n")}
        `.trim();
    }

    public saveTo({file, barrel}: File.ISaveToProps) {
        mkdirSync(dirname(file), {recursive: true});
        writeFileSync(file, this.export(), {
            flag:     "w+",
            encoding: "utf8",
        });
        if (barrel) {
            const filename = basename(file).replace(".ts", "").replace(".tsx", "");
            const index    = normalize(`${dirname(file)}/index.ts`);
            if (!existsSync(index) || !readFileSync(index, {encoding: "utf8"})?.includes(filename)) {
                appendFileSync(index, `export * from "./${filename}"\n`, {
                    encoding: "utf8",
                });
            }
        }
        return this;
    }
}

export namespace File {
    export interface ISaveToProps {
        file: string;
        barrel: boolean;
    }
}
