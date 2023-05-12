import {env}                                                 from "@/monye.one/env.mjs";
import {
    type IContainer,
    PumpIt,
    SCOPE,
    wrapContainer
}                                                            from "@leight/container";
import {withServerContainer as $withLeightServerContainer}   from "@leight/container-server";
import {$PrismaClient}                                       from "@leight/prisma";
import {BootstrapLogger}                                     from "@leight/winston";
import {withServerContainer as $withMonyeOneServerContainer} from "@monye.one/container-server";
import {PrismaClient}                                        from "@monye.one/prisma";

BootstrapLogger({
    loggers: [
        "auth",
    ],
});

export const container = new PumpIt();

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
    $withLeightServerContainer(container);
    $withMonyeOneServerContainer(container);

    return {
        get PrismaClient() {
            return container.resolve<PrismaClient>($PrismaClient);
        },
    };
})(container);
