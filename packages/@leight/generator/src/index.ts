export interface IWithImports {
    imports: Record<string, string[]>;
}

export interface IConst {
    type?: string;
    body: string;
}

export interface IWithConsts {
    /**
     * Consts just laying around the file
     */
    consts?: Record<string, IConst>;
    /**
     * Consts being exported
     */
    exports?: Record<string, IConst>;
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

export interface IClass {
    extends?: string;
    implements?: string;
    body?: string;
}

export interface IWithClasses {
    classes?: Record<string, IClass>;
    exports?: Record<string, IClass>;
}

export interface IExportable {
    export(): string;
}

/**
 * Reference to a type in a package.
 */
export interface IPackageType {
    /**
     * Type
     */
    type: string;
    /**
     * Where it comes from
     */
    package: string;
}
