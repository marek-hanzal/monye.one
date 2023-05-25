import {resolvePackageJson}      from "@leight/utils-server";
import {normalize}               from "node:path";
import {type ISdkGeneratorProps} from "../../api";
import {
    IWithTemplateParams,
    withSdk,
    withTemplate
}                                from "../../index";
import {generatorSdkBarrel}      from "../generatorSdkBarrel";
import {
    type IWithFormParams,
    withForm
}                                from "./withForm";
import {
    type IWithRepositoryParams,
    withRepository
}                                from "./withRepository";
import {
    type IWithRepositoryExParams,
    withRepositoryEx
}                                from "./withRepositoryEx";
import {
    type IWithRepositoryMapperParams,
    withRepositoryMapper
}                                from "./withRepositoryMapper";
import {
    type IWithRepositorySymbolParams,
    withRepositorySymbol
}                                from "./withRepositorySymbol";
import {
    type IWithSourceTypeParams,
    withSourceType
}                                from "./withSourceType";

export type IGeneratorCommonProps =
    ISdkGeneratorProps
    & {
        /**
         * Generate base Repository interface
         */
        withRepository?: IWithRepositoryParams;
        /**
         * Generate extended Repository interface
         */
        withRepositoryEx?: IWithRepositoryExParams;
        /**
         * Generate base Repository symbols (for usage in Container)
         */
        withRepositorySymbol?: IWithRepositorySymbolParams;
        /**
         * Generate base Repository mapper
         */
        withRepositoryMapper?: IWithRepositoryMapperParams;
        withSourceType?: IWithSourceTypeParams;
        /**
         * Generate base form stuff (interfaces)
         */
        withForm?: IWithFormParams;
        withTemplate?: IWithTemplateParams;
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
        barrel:    false,
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
                params.withRepositoryMapper ? withRepositoryMapper({
                    ...$params,
                    params: params.withRepositoryMapper,
                }) : undefined,
                params.withSourceType ? withSourceType({
                    ...$params,
                    params: params.withSourceType,
                }) : undefined,
                params.withForm ? withForm({
                    ...$params,
                    params: params.withForm,
                }) : undefined,
                params.withTemplate ? withTemplate({
                    ...$params,
                    params: params.withTemplate,
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
