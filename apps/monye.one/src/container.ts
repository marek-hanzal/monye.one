import {env}                 from "@/monye.one/env.mjs";
import {IContainer}          from "@leight/container";
import {Container}           from "@leight/container-server";
import {BootstrapLogger}     from "@leight/logger-server";
import {$PrismaClient}       from "@leight/prisma";
import {withServerContainer} from "@leight/viv-server";
import {PrismaClient}        from "@monye.one/prisma";

BootstrapLogger({
    loggers: [
        "auth",
    ],
});

export const container = Container.create();

((container: IContainer) => {
    container
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
            scope: IContainer.Scope.SINGLETON,
        });
    withServerContainer(container);
})(container);
