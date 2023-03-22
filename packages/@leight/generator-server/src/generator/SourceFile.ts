import {
    type IExportable,
    type IWithClasses,
    type IWithConsts,
    type IWithImports,
    type IWithInterfaces,
    type IWithTypes
}                           from "@leight/generator";
import {diffOf}             from "@leight/utils";
import {resolvePackageJson} from "@leight/utils-server";
import {
    appendFileSync,
    existsSync,
    mkdirSync,
    readFileSync,
    writeFileSync
}                           from "node:fs";
import {
    basename,
    dirname,
    normalize
}                           from "node:path";
import {Classes}            from "./Classes";
import {Consts}             from "./Consts";
import {Imports}            from "./Imports";
import {Interfaces}         from "./Interfaces";
import {Types}              from "./Types";

export class SourceFile implements IExportable {
    public readonly $imports: Imports;
    public readonly $types: Types;
    public readonly $interfaces: Interfaces;
    public readonly $classes: Classes;
    public readonly $consts: Consts;

    constructor() {
        this.$imports    = new Imports();
        this.$types      = new Types();
        this.$interfaces = new Interfaces();
        this.$classes    = new Classes();
        this.$consts     = new Consts();
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

    public withClasses({classes = {}, exports = {}}: IWithClasses) {
        Object.entries(classes).map(([key, value]) => this.$classes.interface(key, value, false));
        Object.entries(exports).map(([key, value]) => this.$classes.interface(key, value, true));
        return this;
    }

    public export() {
        return ([
            this.$imports,
            this.$types,
            this.$interfaces,
            this.$classes,
            this.$consts,
        ] as const).map(item => item.export().trim()).filter(Boolean).join("\n\n");
    }

    public saveTo({file, barrel, silent = false}: SourceFile.ISaveToProps) {
        mkdirSync(dirname(file), {recursive: true});
        writeFileSync(file, this.export(), {
            flag:     "w+",
            encoding: "utf8",
        });
        if (barrel) {
            const filename = basename(file).replace(".tsx", "").replace(".ts", "");
            const index    = normalize(`${dirname(file)}/index.ts`);
            if (!existsSync(index) || !readFileSync(index, {encoding: "utf8"})?.includes(filename)) {
                appendFileSync(index, `export * from "./${filename}";\n`, {
                    encoding: "utf8",
                });
            }
        }

        const dependencies = Object.keys(resolvePackageJson().dependencies || {});
        const required     = this.$imports.list();
        const diff         = diffOf(required, dependencies);

        if (diff.length) {
            console.log("Current packages", dependencies);
            console.log("Required packages", required);
            console.log("- You should install", diff, "\n\n");
            if (!silent) {
                throw new Error("Missing dependencies");
            }
        }

        return this;
    }
}

export namespace SourceFile {
    export interface ISaveToProps {
        file: string;
        barrel: boolean;
        /**
         * Suppress an exception if there are missing dependencies; defaults to false
         */
        silent?: boolean;
    }
}

export const withSourceFile = () => {
    return new SourceFile();
};
