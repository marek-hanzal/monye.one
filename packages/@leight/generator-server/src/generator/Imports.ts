export class Imports {
    protected imports: Map<string, Set<string>>;

    constructor() {
        this.imports = new Map();
    }

    public withImports(file: string, imports: string[]) {
        const $imports = (this.imports.get(file) || new Set());
        this.imports.set(file, $imports);
        imports.map($imports.add, $imports);
        return this;
    }

    public export() {
        return [...this.imports.entries()].map(([file, imports]) => `import {${[...imports.values()].join(", ")}} from "${file}";`).join("\n");
    }
}
