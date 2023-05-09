import {resolvePackageJson} from "@leight/utils-server";
import {normalize} from "node:path";
import {type ISdkGeneratorProps} from "../../api";
import {withSdk} from "../../index";
import {generatorSdkBarrel} from "../generatorSdkBarrel";
import {type IWithSelectionParams, withSelection} from "./withSelection";
import {IWithSourceParams, withSource} from "./withSource";

export type IGeneratorClientProps =
    ISdkGeneratorProps
    & {
    withSelection?: IWithSelectionParams;
    withSource?: IWithSourceParams;
};

export const generatorClient = (
    {
        packageName = resolvePackageJson().name,
        folder = "src/sdk",
        ...params
    }: IGeneratorClientProps) => {
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
                params.withSelection ? withSelection({
                    ...$params,
                    params: params.withSelection,
                }) : undefined,
                params.withSource ? withSource({
                    ...$params,
                    params: params.withSource,
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
