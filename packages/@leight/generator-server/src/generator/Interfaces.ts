import {
    type IExportable,
    type IInterface
}                        from "@leight/generator";
import {withPackageType} from "../index";

export class Interface implements IExportable {
    public readonly name: string;
    public readonly code: IInterface;
    public readonly isExported: boolean;

    constructor(name: string, code: IInterface, isExported: boolean) {
        this.name = name;
        this.code = code;
        this.isExported = isExported;
    }

    public export() {
        const body = this.code.body?.trim() || "";
        const $extends = this.code.extends?.map($extends => withPackageType($extends).trim()).join(", ");

        return `
${this.isExported ? "export" : ""} interface ${this.name}${$extends ? ` extends ${$extends}` : ""} {${body.length > 0 ? `\n\t${body}` : ""}\n}
`;
    }
}

export class Interfaces implements IExportable {
    public readonly $interfaces: Map<string, Interface>;

    constructor() {
        this.$interfaces = new Map();
    }

    public interface(name: string, code: IInterface, isExported: boolean) {
        this.$interfaces.set(name, new Interface(name, code, isExported));
        return this;
    }

    public export() {
        return [...this.$interfaces.values()].map(item => item.export().trim()).join("\n\n");
    }
}
