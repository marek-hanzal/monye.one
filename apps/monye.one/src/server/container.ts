import {env}                                          from "@/monye.one/env.mjs";
import {
    type IContainer,
    PumpIt,
    SCOPE,
    wrapContainer
}                                                     from "@leight/container";
import {
    withContainer,
    withServerContainer as withLeightContainer
}                                                     from "@leight/container-server";
import {$PrismaClient}                                from "@leight/prisma";
import {BootstrapLogger}                              from "@leight/winston";
import {withServerContainer as withMonyeOneContainer} from "@monye.one/container-server";
import {PrismaClient}                                 from "@monye.one/prisma";

BootstrapLogger({
    loggers: [
        "auth",
    ],
});

export const container = withContainer(new PumpIt());

export const MonyeOneContainer = ((container: IContainer) => {
    wrapContainer(container)
        .bindFactory($PrismaClient, () => {
            return new PrismaClient({
                errorFormat: "pretty",
                log:
                             env.NODE_ENV === "development"
                                 ? [
                                     // "query",
                                     "error",
                                     "warn"
                                 ]
                                 : ["error"],
            });
        }, {
            scope: SCOPE.SINGLETON,
        });
    withLeightContainer(container);
    withMonyeOneContainer(container);

    return {
        get PrismaClient() {
            return container.resolve<PrismaClient>($PrismaClient);
        },
    };
})(container);
