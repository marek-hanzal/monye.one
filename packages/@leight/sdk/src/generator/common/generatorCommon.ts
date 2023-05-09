import {resolvePackageJson} from "@leight/utils-server";
import {normalize} from "node:path";
import {type ISdkGeneratorProps} from "../../api";
import {withSdk} from "../../index";
import {generatorSdkBarrel} from "../generatorSdkBarrel";
import {type IWithFormParams, withForm} from "./withForm";
import {type IWithRepositoryExParams, withRepositoryEx} from "./withRepositoryEx";
import {type IWithRepositorySymbolParams, withRepositorySymbol} from "./withRepositorySymbol";
import {type IWithRepositoryParams, withRepository} from "./withRepository";

export type IGeneratorCommonProps =
    ISdkGeneratorProps
    & {
    withRepository?: IWithRepositoryParams;
    withRepositoryEx?: IWithRepositoryExParams;
    withRepositorySymbol?: IWithRepositorySymbolParams;
    withForm?: IWithFormParams;
}

export const generatorCommon = (
    {
        packageName = resolvePackageJson().name,
        folder = "src/sdk",
        ...params
    }: IGeneratorCommonProps) => {
    if (!packageName) {
        throw new Error("Cannot resolve packageName");
    }

    const $params = {
        packageName,
        barrel: false,
        directory: normalize(`${process.cwd()}/${folder}`),
    } as const;

    return withSdk([
        async () => {
            await Promise.all([
                params.withRepository ? withRepository({
                    ...$params,
                    params: params.withRepository,
                }) : undefined,
                params.withRepositoryEx ? withRepositoryEx({
                    ...$params,
                    params: params.withRepositoryEx,
                }) : undefined,
                params.withRepositorySymbol ? withRepositorySymbol({
                    ...$params,
                    params: params.withRepositorySymbol,
                }) : undefined,
                params.withForm ? withForm({
                    ...$params,
                    params: params.withForm,
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
