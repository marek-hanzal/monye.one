import {resolvePackageJson}      from "@leight/utils-server";
import {normalize}               from "node:path";
import {type ISdkGeneratorProps} from "../../api";
import {withSdk}                 from "../../index";
import {generatorSdkBarrel}      from "../generatorSdkBarrel";
import {
    generatorServerBaseSource,
    type IGeneratorServerBaseSourceParams
}                                from "./generatorServerBaseSource";
import {
    generatorServerSource,
    type IGeneratorServerSourceParams
}                                from "./generatorServerSource";
import {
    generatorServerTrpcSource,
    type IGeneratorServerTrpcSourceParams
}                                from "./generatorServerTrpcSource";
import {
    type IWithRepositoryExParams,
    withRepositoryEx
}                                from "./withRepositoryEx";
import {
    type IWithSourceRouterParams,
    withSourceRouter
}                                from "./withSourceRouter";

export type IGeneratorServerProps =
    ISdkGeneratorProps
    & {
        /**
         * Prisma source generator parameters.
         */
        withRepositoryEx?: IWithRepositoryExParams;
        withSourceRouter?: IWithSourceRouterParams;
        /**
         * Generator for Source without Prisma connection.
         */
        BaseSource?: IGeneratorServerBaseSourceParams;
        /**
         * Generates public Source (this should NOT be extended in userland)
         */
        Source?: IGeneratorServerSourceParams;
        /**
         * If you want to generate standard Source TRPC procedure API, put your entities
         * here.
         */
        TrpcSource?: IGeneratorServerTrpcSourceParams;
    }

export const generatorServer = (
    {
        packageName = resolvePackageJson().name,
        folder = "src/sdk",
        ...params
    }: IGeneratorServerProps) => {
    if (!packageName) {
        throw new Error("Cannot resolve packageName");
    }

    const $params = {
        packageName,
        barrel:    false,
        directory: normalize(`${process.cwd()}/${folder}`),
    } as const;

    return withSdk([
        async () => {
            await Promise.all([
                params.BaseSource ? generatorServerBaseSource({
                    ...$params,
                    params: params.BaseSource,
                }) : undefined,
                params.withRepositoryEx ? withRepositoryEx({
                    ...$params,
                    params: params.withRepositoryEx,
                }) : undefined,
                params.withSourceRouter ? withSourceRouter({
                    ...$params,
                    params: params.withSourceRouter,
                }) : undefined,
                params.Source ? generatorServerSource({
                    ...$params,
                    params: params.Source,
                }) : undefined,
                params.TrpcSource ? generatorServerTrpcSource({
                    ...$params,
                    params: params.TrpcSource,
                }) : undefined,
            ]);
            await generatorSdkBarrel({
                ...$params,
                barrel: true,
                params: {},
            });
        },
    ]);
};
