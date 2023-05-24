import {type IPackageType} from "./IPackageType";

export interface IInterface {
    extends?: IPackageType[];
    body?: string;
}
