import {resolvePackageJson}      from "@leight/utils-server";
import {normalize}               from "node:path";
import {type ISdkGeneratorProps} from "../api";
import {
    generatorServerTrpcRouter,
    type IGeneratorServerTrpcRouterParams
}                                from "../generator";

export type IWithServerTrpcRouterProps =
    IGeneratorServerTrpcRouterParams
    &
    ISdkGeneratorProps;

export const withServerTrpcRouter = (
    {
        packageName = resolvePackageJson().name,
        folder = "src/sdk",
        ...params
    }: IWithServerTrpcRouterProps) => {
    if (!packageName) {
        throw new Error("Cannot resolve packageName");
    }

    return [
        async () => generatorServerTrpcRouter({
            packageName,
            folder,
            barrel:    true,
            params,
            directory: normalize(`${process.cwd()}/${folder}`),
        }),
    ];
};
