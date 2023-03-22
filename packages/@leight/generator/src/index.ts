export interface IWithImports {
    imports: Record<string, string[]>;
}

export interface IWithConsts {
    /**
     * Consts just laying around the file
     */
    consts?: Record<string, string>;
    /**
     * Consts being exported
     */
    exports?: Record<string, string>;
}

export interface IWithTypes {
    types?: Record<string, string>;
    exports?: Record<string, string>;
}

export interface IInterface {
    extends?: string;
    body?: string;
}

export interface IWithInterfaces {
    interfaces?: Record<string, IInterface>;
    exports?: Record<string, IInterface>;
}

export interface IExportable {
    export(): string;
}
