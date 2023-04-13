import {type IPackageType} from "@leight/generator";

export const withPackageImport = (withPackage: IPackageType, prefix = "") => {
    if (withPackage.withPackage?.alias) {
        return (prefix ? `${prefix} ` : "") + `${withPackage.type} as ${withPackage.withPackage.alias}`;
    }
    return withPackage.type;
};

export const withPackageType = (withPackage: IPackageType) => withPackage.withPackage?.alias ? withPackage.withPackage.alias : withPackage.type;

export * from "./generator";
