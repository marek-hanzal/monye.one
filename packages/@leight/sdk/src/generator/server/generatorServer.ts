import {resolvePackageJson}      from "@leight/utils-server";
import {normalize}               from "node:path";
import {type ISdkGeneratorProps} from "../../api";
import {
    type IWithTemplateParams,
    withSdk,
    withTemplate
}                                from "../../index";
import {generatorSdkBarrel}      from "../generatorSdkBarrel";
import {
    type IWithRepositoryParams,
    withRepository
}                                from "./withRepository";
import {
    type IWithRepositoryContainerParams,
    withRepositoryContainer
}                                from "./withRepositoryContainer";
import {
    type IWithRepositoryExParams,
    withRepositoryEx
}                                from "./withRepositoryEx";
import {
    type IWithRepositoryHandlerParams,
    withRepositoryHandler
}                                from "./withRepositoryHandler";
import {
    type IWithRepositoryMapperParams,
    withRepositoryMapper
}                                from "./withRepositoryMapper";
import {
    type IWithRepositoryRouterParams,
    withRepositoryRouter
}                                from "./withRepositoryRouter";
import {
    type IWithRepositoryServiceParams,
    withRepositoryService
}                                from "./withRepositoryService";

export type IGeneratorServerProps =
    ISdkGeneratorProps
    & {
        /**
         * Prisma source generator parameters.
         */
        withRepositoryEx?: IWithRepositoryExParams;
        withRepositoryRouter?: IWithRepositoryRouterParams;
        withRepositoryMapper?: IWithRepositoryMapperParams;
        withRepositoryService?: IWithRepositoryServiceParams;
        /**
         * If you want to generate standard Source TRPC procedure API, put your entities
         * here.
         */
        withRepositoryHandler?: IWithRepositoryHandlerParams;
        withRepositoryContainer?: IWithRepositoryContainerParams;
        withRepository?: IWithRepositoryParams;
        withTemplate?: IWithTemplateParams;
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
                params.withRepositoryEx ? withRepositoryEx({
                    ...$params,
                    params: params.withRepositoryEx,
                }) : undefined,
                params.withRepositoryRouter ? withRepositoryRouter({
                    ...$params,
                    params: params.withRepositoryRouter,
                }) : undefined,
                params.withRepositoryMapper ? withRepositoryMapper({
                    ...$params,
                    params: params.withRepositoryMapper,
                }) : undefined,
                params.withRepositoryService ? withRepositoryService({
                    ...$params,
                    params: params.withRepositoryService,
                }) : undefined,
                params.withRepositoryHandler ? withRepositoryHandler({
                    ...$params,
                    params: params.withRepositoryHandler,
                }) : undefined,
                params.withRepositoryContainer ? withRepositoryContainer({
                    ...$params,
                    params: params.withRepositoryContainer,
                }) : undefined,
                params.withRepository ? withRepository({
                    ...$params,
                    params: params.withRepository,
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
