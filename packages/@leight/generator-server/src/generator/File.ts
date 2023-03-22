import {type IWithImports} from "@leight/generator";
import {
    mkdirSync,
    writeFileSync
}                          from "node:fs";
import {dirname}           from "node:path";
import {Consts}            from "./Consts";
import {Imports}           from "./Imports";

export class File {
    public readonly imports: Imports;
    public readonly consts: Consts;
    public readonly blocks: string[];

    constructor() {
        this.imports = new Imports();
        this.consts  = new Consts();
        this.blocks  = [];
    }

    public withImports(withImports: IWithImports) {
        Object.keys(withImports).map(key => {
            this.imports.withImports(key, (withImports as any)[key]);
        });
        return this;
    }

    public block(block: string) {
        this.blocks.push(block.trim());
        return this;
    }

    public export() {
        return `
${this.imports.export()}

${this.blocks.join("\n")}
        `.trim();
    }

    public saveTo(file: string) {
        mkdirSync(dirname(file), {recursive: true});
        writeFileSync(file, this.export(), {
            flag:     "w+",
            encoding: "utf8",
        });
        return this;
    }
}
