import {env}                                         from "@/monye.one/env.mjs";
import {
    type IContainer,
    PumpIt,
    SCOPE,
    wrapContainer
}                                                    from "@leight/container";
import {ServerContainer as $LeightServerContainer}   from "@leight/container-server";
import {$PrismaClient}                               from "@leight/prisma";
import {BootstrapLogger}                             from "@leight/winston";
import {ServerContainer as $MonyeOneServerContainer} from "@monye.one/container-server";
import {PrismaClient}                                from "@monye.one/prisma";

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
                                     "query",
                                     "error",
                                     "warn"
                                 ]
                                 : ["error"],
            });
        }, {
            scope: SCOPE.SINGLETON,
        });

    return {
        get PrismaClient() {
            return container.resolve<PrismaClient>($PrismaClient);
        },
    };
})(container);

export const LeightServerContainer   = $LeightServerContainer(container);
export const MonyeOneServerContainer = $MonyeOneServerContainer(container);
