import {resolvePackageJson}      from "@leight/utils-server";
import {type ISdkGeneratorProps} from "../api";
import {
    generatorServerTrpcProcedure,
    type IGeneratorServerTrpcProcedureParams
}                                from "../generator";

export type IWithServerProcedureProps =
    IGeneratorServerTrpcProcedureParams
    &
    ISdkGeneratorProps;

export const withServerProcedure = (
    {
        packageName = resolvePackageJson().name,
        folder = "src/sdk",
        ...params
    }: IWithServerProcedureProps) => {
    if (!packageName) {
        throw new Error("Cannot resolve packageName");
    }

    return [
        async () => generatorServerTrpcProcedure({
            packageName,
            folder,
            barrel: true,
            params,
        }),
    ];
};
