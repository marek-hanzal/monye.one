import {type IPackageType} from "@leight/generator";

export const withPackageImport = (withPackage: IPackageType, prefix = "") => {
    if (withPackage.withPackage?.alias) {
        return (prefix ? `${prefix} ` : "") + `${withPackage.withPackage.import || withPackage.type} as ${withPackage.withPackage.alias}`;
    }
    return withPackage.type;
};

export const withPackageType = (withPackage: IPackageType) => withPackage.type;

export * from "./generator";
