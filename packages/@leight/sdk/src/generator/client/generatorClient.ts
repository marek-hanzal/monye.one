import {resolvePackageJson}      from "@leight/utils-server";
import {normalize}               from "node:path";
import {type ISdkGeneratorProps} from "../../api";
import {withSdk}                 from "../../index";
import {generatorSdkBarrel}      from "../generatorSdkBarrel";
import {
    type IWithFormParams,
    withForm
}                                from "./withForm";
import {
    type IWithInvalidatorParams,
    withInvalidator
}                                from "./withInvalidator";
import {
    type IWithSelectionParams,
    withSelection
}                                from "./withSelection";
import {
    type IWithSourceParams,
    withSource
}                                from "./withSource";
import {
    type IWithUseRepositoryParams,
    withUseRepository
}                                from "./withUseRepository";

export type IGeneratorClientProps =
    ISdkGeneratorProps
    & {
        withSelection?: IWithSelectionParams;
        withSource?: IWithSourceParams;
        withInvalidator?: IWithInvalidatorParams;
        withUseRepository?: IWithUseRepositoryParams;
        withForm?: IWithFormParams;
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
        barrel:    false,
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
                params.withInvalidator ? withInvalidator({
                    ...$params,
                    params: params.withInvalidator,
                }) : undefined,
                params.withUseRepository ? withUseRepository({
                    ...$params,
                    params: params.withUseRepository,
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
