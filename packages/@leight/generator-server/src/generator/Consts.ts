import {type IExportable} from "@leight/generator";

export class Const implements IExportable {
    public readonly name: string;
    public readonly code: string;
    public readonly isExported: boolean;

    constructor(name: string, code: string, isExported: boolean) {
        this.name       = name;
        this.code       = code;
        this.isExported = isExported;
    }

    public export() {
        return `${this.isExported ? "export" : ""} const ${this.name} = ${this.code};`;
    }
}

export class Consts implements IExportable {
    public readonly $consts: Map<string, Const>;

    constructor() {
        this.$consts = new Map();
    }

    public const(name: string, code: string, isExported: boolean) {
        this.$consts.set(name, new Const(name, code.trim(), isExported));
        return this;
    }

    public export() {
        return [...this.$consts.values()].map(item => item.export()).join("\n");
    }
}
