import {
    type IExportable,
    type IWithConsts,
    type IWithImports,
    type IWithInterfaces,
    type IWithTypes
}                   from "@leight/generator";
import {
    appendFileSync,
    existsSync,
    mkdirSync,
    readFileSync,
    writeFileSync
}                   from "node:fs";
import {
    basename,
    dirname,
    normalize
}                   from "node:path";
import {Consts}     from "./Consts";
import {Imports}    from "./Imports";
import {Interfaces} from "./Interfaces";
import {Types}      from "./Types";

export class SourceFile implements IExportable {
    public readonly $imports: Imports;
    public readonly $consts: Consts;
    public readonly $types: Types;
    public readonly $interfaces: Interfaces;

    constructor() {
        this.$imports    = new Imports();
        this.$consts     = new Consts();
        this.$types      = new Types();
        this.$interfaces = new Interfaces();
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

    public withInterfaces({interfaces = {}, exports = {}}: IWithInterfaces) {
        Object.entries(interfaces).map(([key, value]) => this.$interfaces.interface(key, value, false));
        Object.entries(exports).map(([key, value]) => this.$interfaces.interface(key, value, true));
        return this;
    }

    public export() {
        return ([
            this.$imports,
            this.$consts,
            this.$types,
            this.$interfaces,
        ] as const).map(item => item.export().trim()).filter(Boolean).join("\n\n");
    }

    public saveTo({file, barrel}: SourceFile.ISaveToProps) {
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

export namespace SourceFile {
    export interface ISaveToProps {
        file: string;
        barrel: boolean;
    }
}

export const withSourceFile = () => {
    return new SourceFile();
};
