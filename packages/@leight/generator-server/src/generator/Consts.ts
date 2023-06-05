import {
    type IConst,
    type IExportable
} from "@leight/generator";

export class Const implements IExportable {
    public readonly name: string;
    public readonly code: IConst;
    public readonly isExported: boolean;

    constructor(name: string, code: IConst, isExported: boolean) {
        this.name = name;
        this.code = code;
        this.isExported = isExported;
    }

    public export() {
        return `${this.code.comment ? `${this.code.comment.trim()}\n` : ""}${this.isExported ? "export" : ""} const ${this.name}${this.code.type ? `: ${this.code.type}` : ""} = ${this.code.body.trim()};`.trim();
    }
}

export class Consts implements IExportable {
    public readonly $consts: Map<string, Const>;

    constructor() {
        this.$consts = new Map();
    }

    public const(name: string, code: IConst, isExported: boolean) {
        this.$consts.set(name, new Const(name, code, isExported));
        return this;
    }

    public export() {
        return [...this.$consts.values()].map(item => item.export()).join("\n");
    }
}
